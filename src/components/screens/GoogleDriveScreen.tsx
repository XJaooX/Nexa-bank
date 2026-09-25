import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import {
  initAuth,
  googleSignIn,
  logout,
  listDriveFiles,
  uploadDocumentToDrive,
  deleteDriveFile,
  DriveFileItem,
} from '../../services/googleDriveService';
import { User } from 'firebase/auth';
import {
  FileText,
  Upload,
  Trash2,
  ExternalLink,
  Search,
  RefreshCw,
  LogOut,
  AlertTriangle,
  FolderOpen,
  CheckCircle,
} from 'lucide-react';

interface GoogleDriveScreenProps {
  language: Language;
  isDarkTheme: boolean;
}

export const GoogleDriveScreen: React.FC<GoogleDriveScreenProps> = ({
  language,
  isDarkTheme,
}) => {
  const t = translations[language].drive;

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Destructive & mutating operation confirmation state
  const [confirmUploadOpen, setConfirmUploadOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        fetchFiles(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setFiles([]);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const fetchFiles = async (token: string) => {
    setIsLoadingFiles(true);
    try {
      const items = await listDriveFiles(token);
      setFiles(items);
    } catch (err: any) {
      console.error('Error listing Drive files:', err);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        fetchFiles(result.accessToken);
      }
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setFiles([]);
  };

  const executeUploadSample = async () => {
    if (!accessToken) return;
    setIsProcessingAction(true);
    try {
      const sampleContent = `NEXA BANQUE PRIVÉE — DOSSIER FIDUCIAIRE CERTIFIÉ
Date d'émission: ${new Date().toLocaleDateString()}
Sociétaire: Famille de Saint-Germain (Simulation Académique de Stage)
Établissement: Nexa Haute Banque Paris - Genève - Luxembourg

Objet: Synthèse de Préservation Patrimoniale & Structuration Civile
1. Architecture globale multi-juridictionnelle conforme.
2. Mandats discrétionnaires décorrélés des cycles financiers.
3. Coffre-fort numérique archivé avec succès sur Google Drive.
`;
      const uploaded = await uploadDocumentToDrive(
        accessToken,
        `Nexa_Synthese_Patrimoniale_${Date.now()}.txt`,
        sampleContent,
        'text/plain'
      );
      setConfirmUploadOpen(false);
      setFeedbackMessage(`Document archivé avec succès dans Google Drive: ${uploaded.name}`);
      fetchFiles(accessToken);
      setTimeout(() => setFeedbackMessage(null), 5000);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setFeedbackMessage('Erreur lors de l’archivage sur Google Drive.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  const executeDeleteFile = async (fileId: string) => {
    if (!accessToken) return;
    setIsProcessingAction(true);
    try {
      await deleteDriveFile(accessToken, fileId);
      setConfirmDeleteId(null);
      setFeedbackMessage('Document supprimé avec succès de Google Drive.');
      fetchFiles(accessToken);
      setTimeout(() => setFeedbackMessage(null), 5000);
    } catch (err: any) {
      console.error('Delete failed:', err);
      setFeedbackMessage('Erreur lors de la suppression du fichier.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`flex flex-col w-full animate-in fade-in duration-300 min-h-[70vh] ${
        isDarkTheme ? 'bg-[#0E0E0E] text-[#F8F6F1]' : 'bg-[#FBF9F4] text-[#1B1C19]'
      }`}
    >
      {/* Header */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-10 pb-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-[#C9A227]">
            <span className="w-8 h-[1px] bg-[#C9A227]"></span>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
              Archivage &amp; Cloud Fiduciário
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[48px] tracking-tight leading-[1.1] text-balance">
            {t.title}
          </h1>

          <p
            className={`text-[16px] font-light leading-relaxed ${
              isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
            }`}
          >
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-20">
        {!user || !accessToken ? (
          /* Google Sign In Card */
          <div
            className={`p-8 md:p-12 border max-w-2xl mx-auto text-center space-y-6 ${
              isDarkTheme
                ? 'bg-[#141414] border-[#2B2A26]'
                : 'bg-white border-[#E4E2DD]'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 flex items-center justify-center mx-auto text-[#C9A227]">
              <FolderOpen className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-medium">{t.signInTitle}</h2>
              <p
                className={`text-[14px] font-light leading-relaxed max-w-md mx-auto ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.signInDesc}
              </p>
            </div>

            {/* Official Google Sign-in Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-gray-800 font-sans font-medium text-sm rounded border border-gray-300 shadow hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                </svg>
                <span>{isLoggingIn ? 'Connexion en cours...' : 'Sign in with Google'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Connected Drive Files Explorer */
          <div className="space-y-6">
            {/* Account Bar */}
            <div
              className={`p-6 border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDarkTheme
                  ? 'bg-[#141414] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <div className="flex items-center gap-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Compte Google'}
                    className="w-12 h-12 rounded-full border border-[#C9A227]"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#C9A227] text-black flex items-center justify-center font-bold">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C9A227] font-semibold block">
                    {t.connectedAs}
                  </span>
                  <div className="font-serif text-lg font-medium">
                    {user.displayName || user.email}
                  </div>
                  <div className="text-xs opacity-70 font-mono">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setConfirmUploadOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C9A227] hover:bg-[#DFBE58] text-black text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{t.uploadSampleBtn}</span>
                </button>

                <button
                  onClick={() => accessToken && fetchFiles(accessToken)}
                  className={`p-2.5 border transition-colors cursor-pointer ${
                    isDarkTheme
                      ? 'border-[#2B2A26] hover:bg-[#222222] text-[#A3A099]'
                      : 'border-[#E4E2DD] hover:bg-[#F5F3EE] text-[#444748]'
                  }`}
                  title={t.refreshBtn}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin' : ''}`}
                  />
                </button>

                <button
                  onClick={handleLogout}
                  className={`inline-flex items-center gap-1.5 px-3 py-2.5 border text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                    isDarkTheme
                      ? 'border-[#2B2A26] hover:text-red-400 text-[#A3A099]'
                      : 'border-[#E4E2DD] hover:text-red-600 text-[#444748]'
                  }`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.disconnect}</span>
                </button>
              </div>
            </div>

            {feedbackMessage && (
              <div className="p-4 bg-[#C9A227]/10 border-l-2 border-[#C9A227] text-xs text-[#C9A227] flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            {/* Search Filter */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#C9A227]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full pl-10 pr-4 py-2.5 text-xs focus:outline-none border transition-colors ${
                  isDarkTheme
                    ? 'bg-[#181818] border-[#2B2A26] text-[#F8F6F1] focus:border-[#C9A227]'
                    : 'bg-white border-[#E4E2DD] text-[#1B1C19] focus:border-[#755B00]'
                }`}
              />
            </div>

            {/* File List Table */}
            <div
              className={`border overflow-hidden ${
                isDarkTheme
                  ? 'bg-[#141414] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <div
                className={`px-6 py-3.5 border-b text-[10px] uppercase tracking-wider font-semibold flex items-center justify-between ${
                  isDarkTheme
                    ? 'bg-[#181818] border-[#2B2A26] text-[#A3A099]'
                    : 'bg-[#F5F3EE] border-[#E4E2DD] text-[#444748]'
                }`}
              >
                <span>{t.myFiles} ({filteredFiles.length})</span>
                <span>Actions Fiduciárias</span>
              </div>

              {isLoadingFiles ? (
                <div className="p-12 text-center space-y-3">
                  <div className="w-6 h-6 border-2 border-[#C9A227] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs opacity-60">Chargement de vos documents Google Drive...</p>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="p-12 text-center opacity-60 text-xs">
                  {t.noFiles}
                </div>
              ) : (
                <div className="divide-y divide-[#2B2A26]/50">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`px-6 py-4 flex items-center justify-between transition-colors ${
                        isDarkTheme
                          ? 'hover:bg-[#1A1A1A]'
                          : 'hover:bg-[#FBF9F4]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 pr-4">
                        <FileText className="w-5 h-5 text-[#C9A227] shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">
                            {file.name}
                          </div>
                          <div className="text-[11px] opacity-60 truncate">
                            {file.mimeType}
                            {file.modifiedTime &&
                              ` • ${new Date(file.modifiedTime).toLocaleDateString()}`}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 border transition-colors ${
                              isDarkTheme
                                ? 'border-[#2B2A26] hover:text-[#C9A227] hover:border-[#C9A227]'
                                : 'border-[#E4E2DD] hover:text-[#755B00] hover:border-[#755B00]'
                            }`}
                            title="Ouvrir dans Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => setConfirmDeleteId(file.id)}
                          className={`p-2 border transition-colors ${
                            isDarkTheme
                              ? 'border-[#2B2A26] hover:text-red-400 hover:border-red-400'
                              : 'border-[#E4E2DD] hover:text-red-600 hover:border-red-600'
                          }`}
                          title="Supprimer du Google Drive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Confirmation Dialog: Uploading file */}
      {confirmUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div
            className={`max-w-md w-full p-6 border shadow-2xl space-y-4 ${
              isDarkTheme
                ? 'bg-[#161616] border-[#2B2A26] text-[#F8F6F1]'
                : 'bg-white border-[#E4E2DD] text-[#1B1C19]'
            }`}
          >
            <div className="flex items-center gap-3 text-[#C9A227]">
              <Upload className="w-5 h-5" />
              <h3 className="font-serif text-lg font-medium">{t.confirmUploadTitle}</h3>
            </div>
            <p className="text-xs leading-relaxed opacity-80">{t.confirmUploadDesc}</p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmUploadOpen(false)}
                disabled={isProcessingAction}
                className="px-4 py-2 border border-gray-500 text-xs uppercase tracking-wider cursor-pointer"
              >
                {t.cancelBtn}
              </button>
              <button
                onClick={executeUploadSample}
                disabled={isProcessingAction}
                className="px-5 py-2 bg-[#C9A227] hover:bg-[#DFBE58] text-black text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                {isProcessingAction ? t.uploading : t.confirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: Deleting file (Mandatory Confirmation) */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div
            className={`max-w-md w-full p-6 border shadow-2xl space-y-4 ${
              isDarkTheme
                ? 'bg-[#161616] border-[#2B2A26] text-[#F8F6F1]'
                : 'bg-white border-[#E4E2DD] text-[#1B1C19]'
            }`}
          >
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-serif text-lg font-medium">{t.confirmDeleteTitle}</h3>
            </div>
            <p className="text-xs leading-relaxed opacity-80">{t.confirmDeleteDesc}</p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                disabled={isProcessingAction}
                className="px-4 py-2 border border-gray-500 text-xs uppercase tracking-wider cursor-pointer"
              >
                {t.cancelBtn}
              </button>
              <button
                onClick={() => executeDeleteFile(confirmDeleteId)}
                disabled={isProcessingAction}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                {isProcessingAction ? 'Suppression...' : 'Supprimer Définitivement'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
