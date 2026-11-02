import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  Bell,
  Clock,
  CheckCircle2,
  Wifi,
  X,
  Sparkles,
} from 'lucide-react';

interface NotificationCenterProps {
  onNavigateToQueue?: () => void;
  onNavigateToInstitution?: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  onNavigateToQueue,
  onNavigateToInstitution,
}) => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    unreadNotificationsCount,
    markNotificationsAsRead,
  } = useAccessibility();

  if (!isNotificationsOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Queue Alert: Token H-104 Called',
      message: 'Room 3B physician is ready. Flashing optical beacon is active outside door.',
      time: 'Just now',
      unread: true,
      icon: <Clock className="w-4 h-4 text-brand-coral" />,
      actionLabel: 'View Queue',
      action: onNavigateToQueue,
    },
    {
      id: 'notif-2',
      title: 'Auditory Barrier Resolved',
      message: 'Central Metro Terminal added synchronized LED visual departure boards.',
      time: '12m ago',
      unread: true,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      actionLabel: 'View Analytics',
      action: onNavigateToInstitution,
    },
    {
      id: 'notif-3',
      title: 'Offline Phrase Packs Verified',
      message: 'Hospital and Railway essential communication bundles are cached for 100% offline use.',
      time: '1h ago',
      unread: false,
      icon: <Wifi className="w-4 h-4 text-brand-mint-dark" />,
    },
  ];

  return (
    <div
      role="dialog"
      aria-label="Soundless notification panel"
      className="absolute top-20 right-4 sm:right-8 z-50 w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl border border-brand-violet/20 shadow-2xl p-5 space-y-4 animate-in slide-in-from-top-3 duration-200"
    >
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-violet" />
          <h3 className="text-sm font-black text-brand-charcoal font-display">
            Notifications & Visual Alerts
          </h3>
          {unreadNotificationsCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-brand-coral text-white text-[10px] font-black">
              {unreadNotificationsCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadNotificationsCount > 0 && (
            <button
              onClick={markNotificationsAsRead}
              className="text-[11px] font-bold text-brand-violet hover:underline"
            >
              Mark read
            </button>
          )}
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-2xl border text-xs space-y-1.5 transition-colors ${
              item.unread
                ? 'bg-brand-violet/5 border-brand-violet/25'
                : 'bg-gray-50 border-gray-200/80'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="font-bold text-brand-charcoal">{item.title}</span>
              </div>
              <span className="text-[10px] text-gray-400 shrink-0">{item.time}</span>
            </div>

            <p className="text-gray-600 leading-relaxed text-[11px]">{item.message}</p>

            {item.actionLabel && (
              <div className="pt-1">
                <button
                  onClick={() => {
                    if (item.action) item.action();
                    setIsNotificationsOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-brand-violet/20 text-brand-violet font-bold text-[10px] hover:bg-brand-violet hover:text-white transition-all shadow-sm"
                >
                  {item.actionLabel} →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-2 border-t flex items-center justify-between text-[11px] text-gray-500">
        <span className="flex items-center gap-1 text-brand-mint-dark font-medium">
          <Sparkles className="w-3 h-3" />
          Soundless Strobe Sync Active
        </span>
        <button
          onClick={() => setIsNotificationsOpen(false)}
          className="font-bold text-gray-600 hover:text-brand-charcoal"
        >
          Close
        </button>
      </div>
    </div>
  );
};
