// import React from 'react';

// const UserAvatar = ({ user, size = 'md' }) => {
//   // ✅ Get initials from name
//   const getInitials = (name) => {
//     if (!name) return '?';
//     const parts = name.trim().split(' ');
//     if (parts.length === 1) return parts[0][0].toUpperCase();
//     return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//   };

//   // ✅ Fix the image URL
//   const getImageUrl = (url) => {
//     if (!url) return null;
    
//     // If it's already a full URL, fix localhost if needed
//     if (url.startsWith('http')) {
//       return url.replace('http://localhost:8000', 'http://localhost:8000');
//     }
    
//     // If it's a relative path, prepend base URL
//     return `http://localhost:8000${url}`;
//   };

//   // const sizeClasses = {
//   //   sm: 'w-8 h-8 text-sm',
//   //   md: 'w-10 h-10 text-base',
//   //   lg: 'w-11 h-11 text-lg',
//   //   xl: 'w-16 h-16 text-2xl',
//   // };
//   const sizeClasses = {
//   sm: 'w-10 h-10 text-sm',      // ✅ Changed from w-8 h-8
//   md: 'w-12 h-12 text-base',    // ✅ Changed from w-10 h-10
//   lg: 'w-14 h-14 text-lg',      // ✅ Changed from w-11 h-11
//   xl: 'w-16 h-16 text-2xl',
// };

//   const initials = getInitials(user?.name);
//   const imageUrl = getImageUrl(user?.profileImageUrl);

//   return (
//     <>
//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt={user?.name || 'Profile'}
//           className={`${sizeClasses[size]} rounded-full object-cover bg-gray-300`}
//           onError={(e) => {
//             // ✅ If image fails to load, hide it and show initials
//             e.target.style.display = 'none';
//             e.target.nextSibling.style.display = 'flex';
//           }}
//         />
//       ) : null}
      
//       {/* ✅ Initials fallback (shown if no image OR image fails to load) */}
//       <div
//         className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-yellow-400`}
//         style={{ 
//           backgroundColor: '#800000', // Maroon
//           display: imageUrl ? 'none' : 'flex' // Hidden if image exists
//         }}
//       >
//         {initials}
//       </div>
//     </>
//   );
// };

// export default UserAvatar;






// import React from 'react';

// const UserAvatar = ({ user, size = 'md' }) => {
//   const getInitials = (name) => {
//     if (!name) return '?';
//     const parts = name.trim().split(' ');
//     if (parts.length === 1) return parts[0][0].toUpperCase();
//     return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//   };

//   const getImageUrl = (url) => {
//     if (!url) return null;
    
//     if (url.startsWith('http')) {
//       return url;
//     }
    
//     return `http://localhost:8000${url}`;
//   };

//   const sizeClasses = {
//     sm: 'w-10 h-10 text-sm',
//     md: 'w-11 h-11 text-base',
//     lg: 'w-12 h-12 text-lg',
//     xl: 'w-16 h-16 text-2xl',
//   };

//   const initials = getInitials(user?.name);
//   const imageUrl = getImageUrl(user?.profileImageUrl);

//   return (
//     <div className="relative inline-block flex-shrink-0">
//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt={user?.name || 'Profile'}
//           className={`${sizeClasses[size]} rounded-full object-cover bg-white`}
//           style={{
//             objectFit: 'cover',
//             objectPosition: 'center',
//           }}
//           onError={(e) => {
//             e.target.style.display = 'none';
//             const initialsDiv = e.target.nextElementSibling;
//             if (initialsDiv) {
//               initialsDiv.style.display = 'flex';
//             }
//           }}
//         />
//       ) : null}
      
//       <div
//         className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-yellow-400`}
//         style={{ 
//           backgroundColor: '#800000',
//           display: imageUrl ? 'none' : 'flex'
//         }}
//       >
//         {initials}
//       </div>
//     </div>
//   );
// };

// export default UserAvatar;







import React from 'react';

const UserAvatar = ({ user, size = 'md' }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    
    if (url.startsWith('http')) {
      // ✅ Add cache-busting timestamp to force reload
      return `${url}?t=${Date.now()}`;
    }
    
    // ✅ Add cache-busting for relative URLs too
    return `http://localhost:8000${url}?t=${Date.now()}`;
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm min-w-[2.5rem] min-h-[2.5rem]',     // ✅ Added min-width/height
    md: 'w-11 h-11 text-base min-w-[2.75rem] min-h-[2.75rem]',
    lg: 'w-12 h-12 text-lg min-w-[3rem] min-h-[3rem]',
    xl: 'w-16 h-16 text-2xl min-w-[4rem] min-h-[4rem]',
  };

  const initials = getInitials(user?.name);
  
  // ✅ CRITICAL: Check both possible property names
  const imageUrl = getImageUrl(user?.profileImageUrl || user?.profile_image_url);

  return (
    <div className="relative inline-block flex-shrink-0">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={user?.name || 'Profile'}
          className={`${sizeClasses[size]} rounded-full bg-white`}
          style={{
            objectFit: 'cover',         // ✅ Keeps aspect ratio but fills circle
            objectPosition: 'center',    // ✅ Centers the image
            aspectRatio: '1 / 1',        // ✅ Forces square aspect ratio
          }}
          onError={(e) => {
            console.error('Image load failed for:', imageUrl); // ✅ Debug log
            e.target.style.display = 'none';
            const initialsDiv = e.target.nextElementSibling;
            if (initialsDiv) {
              initialsDiv.style.display = 'flex';
            }
          }}
        />
      ) : null}
      
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-yellow-400`}
        style={{ 
          backgroundColor: '#800000',
          display: imageUrl ? 'none' : 'flex',
          aspectRatio: '1 / 1',  // ✅ Forces perfect circle
        }}
      >
        {initials}
      </div>
    </div>
  );
};

export default UserAvatar;