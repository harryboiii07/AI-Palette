import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const UserPreferences = ({ isOpen, onClose }) => {
  const { userPreferences, updatePreference, togglePreference } = useAppContext();
  const [activeTab, setActiveTab] = useState('general');

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '0',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'hidden',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle = {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const tabsStyle = {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb'
  };

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    border: 'none',
    backgroundColor: isActive ? 'white' : 'transparent',
    color: isActive ? '#2563eb' : '#6b7280',
    cursor: 'pointer',
    borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
    fontSize: '14px',
    fontWeight: '500'
  });

  const contentStyle = {
    padding: '24px',
    maxHeight: '400px',
    overflowY: 'auto'
  };

  const settingRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6'
  };

  const switchStyle = (isOn) => ({
    width: '44px',
    height: '24px',
    backgroundColor: isOn ? '#2563eb' : '#d1d5db',
    borderRadius: '12px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  });

  const switchKnobStyle = (isOn) => ({
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: isOn ? '22px' : '2px',
    transition: 'left 0.2s',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  });

  const renderGeneralSettings = () => (
    <div>
      <div style={settingRowStyle}>
        <div>
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Theme</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Choose your interface theme</div>
        </div>
        <select
          value={userPreferences.theme}
          onChange={(e) => updatePreference('theme', e.target.value)}
          style={{
            padding: '6px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div style={settingRowStyle}>
        <div>
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Language</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Select your preferred language</div>
        </div>
        <select
          value={userPreferences.language}
          onChange={(e) => updatePreference('language', e.target.value)}
          style={{
            padding: '6px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div style={settingRowStyle}>
        <div>
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Items per page</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Number of items to show in lists</div>
        </div>
        <select
          value={userPreferences.itemsPerPage}
          onChange={(e) => updatePreference('itemsPerPage', parseInt(e.target.value))}
          style={{
            padding: '6px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div>
      <div style={settingRowStyle}>
        <div>
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Push Notifications</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Receive notifications for important updates</div>
        </div>
        <div
          style={switchStyle(userPreferences.notifications)}
          onClick={() => togglePreference('notifications')}
        >
          <div style={switchKnobStyle(userPreferences.notifications)} />
        </div>
      </div>

      <div style={settingRowStyle}>
        <div>
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Auto-save Forms</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Automatically save form progress</div>
        </div>
        <div
          style={switchStyle(userPreferences.autoSave)}
          onClick={() => togglePreference('autoSave')}
        >
          <div style={switchKnobStyle(userPreferences.autoSave)} />
        </div>
      </div>
    </div>
  );

  const renderChartSettings = () => (
    <div>
      <div style={settingRowStyle}>
        <div>
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Default Chart Type</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Choose your preferred chart visualization</div>
        </div>
        <select
          value={userPreferences.chartType}
          onChange={(e) => updatePreference('chartType', e.target.value)}
          style={{
            padding: '6px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="area">Area Chart</option>
        </select>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'charts':
        return renderChartSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
            User Preferences
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        <div style={tabsStyle}>
          <button
            style={tabStyle(activeTab === 'general')}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            style={tabStyle(activeTab === 'notifications')}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            style={tabStyle(activeTab === 'charts')}
            onClick={() => setActiveTab('charts')}
          >
            Charts
          </button>
        </div>

        <div style={contentStyle}>
          {renderTabContent()}
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            Preferences are automatically saved and synced across your devices.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
