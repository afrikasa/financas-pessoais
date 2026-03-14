import { useState } from 'react';
import { Cloud, CloudOff, LogIn, LogOut, Upload, Download, RefreshCw } from 'lucide-react';

export default function FirebaseSyncPanel({ 
  user, 
  syncing, 
  error, 
  onSignIn, 
  onSignOut, 
  onUpload, 
  onDownload,
  darkMode 
}) {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="relative">
      {/* Sync Status Indicator */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className={`p-3 rounded-full transition-all ${
          darkMode 
            ? 'bg-gray-700 hover:bg-gray-600' 
            : 'bg-gray-100 hover:bg-gray-200'
        } relative`}
        title={user ? 'Conectado - Cloud Sync' : 'Não conectado'}
      >
        {syncing ? (
          <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
        ) : user ? (
          <Cloud className="w-5 h-5 text-green-500" />
        ) : (
          <CloudOff className="w-5 h-5 text-gray-400" />
        )}
        
        {/* Online indicator dot */}
        {user && !syncing && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
        )}
      </button>

      {/* Sync Panel */}
      {showPanel && (
        <div className={`absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-2xl p-6 z-50 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              ☁️ Cloud Sync
            </h3>
            <button
              onClick={() => setShowPanel(false)}
              className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ✕
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Not Authenticated */}
          {!user && (
            <div className="space-y-4">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Sincroniza os teus dados entre todos os dispositivos com o Google Cloud.
              </p>
              
              <button
                onClick={onSignIn}
                disabled={syncing}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <LogIn className="w-5 h-5" />
                {syncing ? 'A conectar...' : 'Entrar com Google'}
              </button>

              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ✅ Backup automático<br />
                ✅ Sincronização tempo real<br />
                ✅ Multidevice<br />
                ✅ Funciona offline
              </div>
            </div>
          )}

          {/* Authenticated */}
          {user && (
            <div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex-1">
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {user.displayName || 'Utilizador'}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user.email}
                  </div>
                </div>
                <div className="text-green-500">
                  <Cloud className="w-5 h-5" />
                </div>
              </div>

              {/* Sync Actions */}
              <div className="space-y-2">
                <button
                  onClick={onUpload}
                  disabled={syncing}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  {syncing ? 'A enviar...' : 'Enviar para Cloud'}
                </button>

                <button
                  onClick={onDownload}
                  disabled={syncing}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    darkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  {syncing ? 'A receber...' : 'Receber da Cloud'}
                </button>
              </div>

              {/* Info */}
              <div className={`text-xs p-3 rounded-lg ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
              }`}>
                💡 <strong>Dica:</strong> Os dados sincronizam automaticamente. Usa "Enviar" para fazer backup manual ou "Receber" para restaurar dados.
              </div>

              {/* Sign Out */}
              <button
                onClick={onSignOut}
                disabled={syncing}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
