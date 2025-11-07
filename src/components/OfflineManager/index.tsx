// ──────────────────────────────────────────────────────────────────────────────
// OfflineManager Component
// Manage offline country packs and storage
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { getAllCountries } from '../../countries';

export const OfflineManager: React.FC = () => {
  const [downloadedPacks, setDownloadedPacks] = useState<Set<string>>(new Set());
  const [downloading, setDownloading] = useState<Set<string>>(new Set());
  const [storageUsage, setStorageUsage] = useState<number>(0);
  const [storageQuota, setStorageQuota] = useState<number>(0);

  const allCountries = getAllCountries();

  // Check which packs are downloaded
  useEffect(() => {
    checkDownloadedPacks();
    updateStorageInfo();
  }, []);

  const checkDownloadedPacks = async () => {
    if (!('caches' in window)) return;

    try {
      const cache = await caches.open('country-packs-v2.0.0');
      const keys = await cache.keys();

      const downloaded = new Set<string>();
      keys.forEach(request => {
        const match = request.url.match(/\/countries\/([A-Z]{2})\//);
        if (match) {
          downloaded.add(match[1]);
        }
      });

      setDownloadedPacks(downloaded);
    } catch (error) {
      console.error('Failed to check downloaded packs:', error);
    }
  };

  const updateStorageInfo = async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        setStorageUsage(estimate.usage || 0);
        setStorageQuota(estimate.quota || 0);
      } catch (error) {
        console.error('Failed to get storage estimate:', error);
      }
    }
  };

  const downloadPack = async (countryIso2: string) => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
      alert('Service Worker not available. Please reload the page.');
      return;
    }

    setDownloading(prev => new Set(prev).add(countryIso2));

    try {
      const messageChannel = new MessageChannel();
      const controller = navigator.serviceWorker.controller;

      const response = await new Promise<{ success: boolean; error?: string }>((resolve) => {
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data);
        };

        controller.postMessage(
          { type: 'DOWNLOAD_COUNTRY_PACK', countryIso2 },
          [messageChannel.port2]
        );
      });

      if (response.success) {
        setDownloadedPacks(prev => new Set(prev).add(countryIso2));
        await updateStorageInfo();
      } else {
        alert(`Failed to download: ${response.error}`);
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(prev => {
        const next = new Set(prev);
        next.delete(countryIso2);
        return next;
      });
    }
  };

  const deletePack = async (countryIso2: string) => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
      return;
    }

    try {
      const messageChannel = new MessageChannel();
      const controller = navigator.serviceWorker.controller;

      const response = await new Promise<{ success: boolean }>((resolve) => {
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data);
        };

        controller.postMessage(
          { type: 'DELETE_COUNTRY_PACK', countryIso2 },
          [messageChannel.port2]
        );
      });

      if (response.success) {
        setDownloadedPacks(prev => {
          const next = new Set(prev);
          next.delete(countryIso2);
          return next;
        });
        await updateStorageInfo();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getCountryFlag = (iso2: string) => {
    return String.fromCodePoint(...iso2.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)));
  };

  const storagePercent = storageQuota > 0 ? (storageUsage / storageQuota) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Offline Country Packs</h2>
        <p className="text-gray-600">
          Download country packs to use the app offline. Each pack includes country info, maps data, and currency rates.
        </p>
      </div>

      {/* Storage Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-900">Storage Usage</span>
          <span className="text-sm text-blue-700">
            {formatBytes(storageUsage)} / {formatBytes(storageQuota)}
          </span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${storagePercent}%` }}
          />
        </div>
        <p className="text-xs text-blue-700 mt-2">
          {downloadedPacks.size} country packs downloaded
        </p>
      </div>

      {/* Country List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allCountries.map(country => {
          const isDownloaded = downloadedPacks.has(country.iso2);
          const isDownloading = downloading.has(country.iso2);

          return (
            <div
              key={country.iso2}
              className={`border-2 rounded-lg p-4 transition-colors ${
                isDownloaded
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getCountryFlag(country.iso2)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{country.name}</h3>
                    <p className="text-xs text-gray-500">
                      {country.currency} · {country.timeZones[0].split('/')[1]}
                    </p>
                  </div>
                </div>

                {isDownloaded ? (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Offline
                    </span>
                    <button
                      onClick={() => deletePack(country.iso2)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => downloadPack(country.iso2)}
                    disabled={isDownloading}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isDownloading
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isDownloading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Downloading
                      </span>
                    ) : (
                      'Download'
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-1">About Offline Packs</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Each pack is approximately 2-5 MB</li>
              <li>Packs are updated automatically when online</li>
              <li>Currency rates are cached for 7 days</li>
              <li>Maps require separate download from provider</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineManager;
