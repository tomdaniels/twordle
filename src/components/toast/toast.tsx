import React, { useState, useEffect } from 'react';

import styles from '../../styles/Toast.module.css';

type ToasterProps = {
  queue: string[];
};

const Toast: React.FC<ToasterProps> = ({ queue }) => {
  const [toast, setToast] = useState<string[]>(queue);

  useEffect(() => {
    setToast(queue);
  });

  return (
    <div
      className={styles.container}
      style={{ display: queue?.length > 0 ? 'flex' : 'none' }}
    >
      {toast?.length &&
        toast.map((n, i) => {
          return (
            <p key={`toast-${i}`} className={styles.toast}>
              {n}
            </p>
          );
        })}
    </div>
  );
};

export default Toast;
