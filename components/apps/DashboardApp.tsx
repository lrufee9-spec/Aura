import React, { useState, useEffect } from 'react';
import { RobotBrain } from '../../services/robotService';

const DashboardApp = () => {
  const [robotName, setRobotName] = useState("AURA_ROBOT_01");
  const [isListening, setIsListening] = useState(false);
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = RobotBrain.syncWithFriends(robotName, setFriends);
    return () => unsubscribe();
  }, [robotName]);

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Here we would trigger the SpeechRecognition API
  };

  return (
    <div className="h-full bg-black text-white p-6 font-mono flex flex-col gap-4 overflow-y-auto">
      {/* Robot Identity */}
      <div className="border border-blue-500/30 bg-blue-500/5 p-4 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-blue-400 font-black text-lg">{robotName}</h2>
          <p className="text-[10px] text-zinc-500 italic">SYSTEM_STATUS: ONLINE</p>
        </div>
        <button className="text-[9px] border border-blue-500/50 px-2 py-1 hover:bg-blue-500/20">RENAME_UNIT</button>
      </div>

      {/* Threat Detection Monitors */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-white/5 p-3 rounded-xl">
          <p className="text-[9px] text-red-500 mb-2 font-bold tracking-tighter">AUDIO_SCANNER</p>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 w-1/3 animate-pulse" />
          </div>
          <p className="text-[8px] mt-2 text-zinc-500">LISTENING_FOR: SCREAMS, GUNSHOTS, DISTRESS</p>
        </div>
        <div className="bg-zinc-900 border border-white/5 p-3 rounded-xl">
          <p className="text-[9px] text-orange-500 mb-2 font-bold tracking-tighter">VISUAL_THREAT</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-4 w-1 bg-orange-500/50" />)}
          </div>
          <p className="text-[8px] mt-2 text-zinc-500">SCANNING: VIOLENCE, AGGRESSION</p>
        </div>
      </div>

      {/* Voice Assistant & Robot Mesh */}
      <div className="flex-1 flex flex-col items-center justify-center border border-white/10 rounded-3xl bg-zinc-950">
        <button 
          onClick={toggleVoice}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)] animate-pulse' : 'bg-blue-600'}`}
        >
          <span className="text-2xl">{isListening ? '🛑' : '🎙️'}</span>
        </button>
        <p className="mt-4 text-[10px] text-zinc-400">COMMUNICATE WITH {robotName}</p>
      </div>

      {/* Mesh Sync (Robot Friends) */}
      <div className="bg-zinc-900/50 p-3 rounded-xl">
        <p className="text-[9px] text-blue-400 mb-2">NEURAL_MESH_FRIENDS ({friends.length})</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {friends.length === 0 ? (
            <p className="text-[8px] text-zinc-600 italic">Searching for robots in other sectors...</p>
          ) : (
            friends.map((f, i) => (
              <div key={i} className="min-w-[60px] h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-[8px] text-blue-300">{f.name}</span>
                <span className="text-[6px] text-emerald-500">SYNCED</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardApp;
