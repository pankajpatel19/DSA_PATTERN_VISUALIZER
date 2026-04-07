import React from 'react';

const MissingNumber = () => (
  <div className='visualizer-card' style={{ textAlign: 'center', padding: '40px' }}>
    <h2 style={{ color: 'var(--accent)', marginBottom: '16px' }}>MissingNumber</h2>
    <div style={{
      padding: '24px',
      background: 'rgba(59, 130, 246, 0.05)',
      border: '1px dashed var(--accent)',
      borderRadius: '12px',
      color: 'var(--text-secondary)'
    }}>
      <p style={{ fontSize: '1.1rem' }}>??? This visualizer is currently under construction.</p>
      <p style={{ marginTop: '8px' }}>We are working hard to bring you a beautiful interactive visualizer for the <strong>MissingNumber</strong> pattern!</p>
    </div>
  </div>
);

export default MissingNumber;
