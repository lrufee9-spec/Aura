import { db, auth } from './firebase';
import { doc, setDoc, collection, onSnapshot, query, where } from 'firebase/firestore';

export const RobotBrain = {
  // Voice/Audio Threat Analysis
  analyzeAudio: (text: string) => {
    const threats = ['help', 'stop', 'kill', 'gunshot', 'breaking', 'scream'];
    return threats.some(t => text.toLowerCase().includes(t));
  },

  // Save Biometrics (Fingerprint/Face)
  registerBiometrics: async (type: 'fingerprint' | 'face', data: string) => {
    const user = auth.currentUser;
    if (!user) return;
    await setDoc(doc(db, 'biometric_vault', user.uid), {
      [type]: data,
      timestamp: Date.now()
    }, { merge: true });
  },

  // Robot Mesh: Sync with other robots globally
  syncWithFriends: (robotName: string, callback: (friends: any[]) => void) => {
    const q = query(collection(db, 'robots'), where('status', '==', 'active'));
    return onSnapshot(q, (snapshot) => {
      const friends = snapshot.docs
        .map(doc => doc.data())
        .filter(r => r.name !== robotName);
      callback(friends);
    });
  }
};
