import React from 'react'
import { formatTimestamp } from '../../utils/formateTimeStamp';
import { baseImgUrl } from '../../constance';

const CommentCard = ({comment}) => {
  // console.log("This comment from comment card", comment);
  return (
    <div key={comment.id} className="mb-3 flex items-start">
      <img
        src={baseImgUrl + comment.userId.picturePath || `https://api.dicebear.com/6.x/initials/svg?seed=${comment.userName}`}
        alt={comment.userName}
        className="w-8 h-8 rounded-full mr-2 object-cover"
      />
      <div className="flex-grow">
        <div className="bg-slate-100 dark:bg-gray-700 rounded-lg p-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
              {comment.userId.firstName + " " + comment.userId.lastName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimestamp(comment.createdAt)}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentCard