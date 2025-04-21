import React from 'react';
import { userProfile } from '../data/mockData';

const MatchScoreExplanation = () => {
  return (
    <div className="mt-4 bg-blue-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-2">How Match Scores Are Calculated</h3>
      
      <p className="mb-3">
        Match scores represent how well each shoe matches your running profile and preferences.
        Our algorithm considers multiple factors to generate personalized recommendations.
      </p>
      
      <div className="mb-3">
        <h4 className="font-medium">Your Runner Profile:</h4>
        <ul className="list-disc list-inside text-sm ml-2 mt-1 text-gray-700">
          <li>Experience Level: {userProfile.experienceLevel}</li>
          <li>Running Frequency: {userProfile.runningFrequency}</li>
          <li>Primary Terrain: {userProfile.runningType}</li>
          <li>Foot Type: {userProfile.footArch} arch, {userProfile.pronation} pronation</li>
          <li>Goals: {userProfile.goals.map(g => g.replace('_', ' ')).join(', ')}</li>
        </ul>
      </div>
      
      <div className="mb-3">
        <h4 className="font-medium">Your Preferences:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {Object.entries(userProfile.preferences).map(([key, value]) => (
            <div key={key} className="bg-white rounded p-2 text-center">
              <div className="text-xs text-gray-600">{key}</div>
              <div className="font-medium">{value}/10</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-sm bg-white p-3 rounded border border-blue-100">
        <h4 className="font-medium mb-1">Match Score Algorithm:</h4>
        <p>
          1. We evaluate the technical match (40%): how well the shoe's specs match your needs<br />
          2. We analyze community feedback (30%): how users with similar profiles rated the shoe<br />
          3. We compare your preferences (30%): how closely the shoe aligns with your priorities
        </p>
      </div>
      
      <p className="mt-3 text-sm text-gray-600">
        Note: These scores are personalized to your profile and may change if you update your preferences.
      </p>
    </div>
  );
};

export default MatchScoreExplanation;