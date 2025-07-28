import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const PasswordCriteria = ({ password = "" }) => {
  const criteria = [
    { label: "At least 6 characters",  met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number",         met: /\d/.test(password) },
    { label: "Contains special character",met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map(item => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met
            ? <FaCheck className="text-green-500 mr-2 text-xs" />
            : <FaTimes className="text-gray-400 mr-2 text-xs" />
          }
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password = "" }) => {
  /* ---------- helpers ---------- */
  const getStrength = pass => {
    let s = 0;
    if (pass.length >= 6) s++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) s++;
    if (/\d/.test(pass)) s++;
    if (/[^a-zA-Z\d]/.test(pass)) s++;
    return s;          // 0‒4
  };

  const strength     = getStrength(password);

  const strengthText = ["Very weak","Weak","Fair","Good","Strong"][strength];

  const barColor = idx => (
    idx < strength
      ? ["bg-red-500","bg-red-400","bg-yellow-500","bg-yellow-400","bg-green-500"][strength]
      : "bg-gray-600"
  );

  /* ---------- ui ---------- */
  return (
    <div className="mt-2 flex flex-col w-full">
      {/* label row */}
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">{strengthText}</span>
      </div>

      {/* strength bars */}
      <div className="flex gap-1 mb-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`h-1 w-full rounded-full transition-colors duration-300 ${barColor(i)}`}
          />
        ))}
      </div>
       <PasswordCriteria password={password} />

    </div>
  );
};

export default PasswordStrengthMeter;
