"use client";

import { motion } from "framer-motion";
import useMatchCardLayoutHelper from "@/hooks/useMatchCardLayoutHelper";
import Spinner from "../Spinner";
import { Match } from "@/types/matches";

interface MatchCardProps {
  match: Match;
  isNew?: boolean;
  isRemoving?: boolean;
  isLoading?: boolean;
  fixedHeight?: boolean;
}

const MatchCard = ({
  match,
  isNew,
  isRemoving,
  isLoading,
  fixedHeight,
}: MatchCardProps) => {
  const {
    formatTime,
    getAnimationStyles,
    cardAnimationVariants,
    getTransition,
    statusInfo,
  } = useMatchCardLayoutHelper(match, isNew, isRemoving);

  return (
    <motion.div
      layout
      variants={cardAnimationVariants}
      initial="initial"
      animate={isNew ? "new" : isRemoving ? "removing" : "animate"}
      exit="exit"
      transition={getTransition()}
      className={`
        relative rounded-lg overflow-hidden
        ${getAnimationStyles()}
        ${isLoading ? "opacity-50 pointer-events-none" : ""}
        ${fixedHeight ? "h-full" : ""}
      `}>
      {(isNew || isRemoving) && (
        <motion.div
          className={`absolute inset-0 ${
            isNew ? "bg-green-400/30" : "bg-red-400/30"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.8, 0.5, 0] }}
          transition={{ duration: 2.5, times: [0, 0.2, 0.6, 0.9, 1] }}
        />
      )}

      {isNew && (
        <>
          <motion.div
            className="absolute inset-0 border-2 border-green-400 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0, 1, 0],
              scale: [1, 1.02, 1, 1.02, 1],
            }}
            transition={{
              duration: 2.0,
              times: [0, 0.25, 0.5, 0.75, 1],
              repeat: 1,
            }}
          />
          <motion.div
            className="absolute top-2 right-2 bg-green-500 text-white text-sm px-3 py-1 font-bold rounded-md shadow-lg z-20"
            initial={{ scale: 0, rotate: -45 }}
            animate={{
              scale: 1.1,
              rotate: 0,
            }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{
              type: "spring" as const,
              stiffness: 200,
              damping: 15,
            }}>
            NOVO
          </motion.div>
        </>
      )}

      {isRemoving && (
        <motion.div
          className="absolute top-2 right-2 bg-red-500 text-white text-sm px-3 py-1 font-bold rounded-md shadow-lg z-20"
          initial={{ scale: 0, rotate: 45 }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          exit={{ scale: 0, rotate: -45 }}
          transition={{
            type: "spring" as const,
            stiffness: 200,
            damping: 15,
          }}>
          ZATVORENO
        </motion.div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-gray-800/50 rounded-lg flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      )}

      <div className="p-4 space-y-3 relative z-10">
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">
              {match.league}
            </span>
            <span className="text-gray-300 text-xs">
              {formatTime(match.matchTime)} • {match.venue}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-2 ${statusInfo.className}`}>
              {statusInfo.icon && (
                <>
                  {match.status === "LIVE" ? (
                    <motion.span
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center">
                      {statusInfo.icon}
                    </motion.span>
                  ) : (
                    <span className="flex items-center">{statusInfo.icon}</span>
                  )}
                </>
              )}
              {statusInfo.text}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 hover:bg-gray-700/30 rounded transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-white font-semibold text-sm">
                {match.homeTeam}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-white bg-gray-700 px-3 py-1 rounded">
                {match.homeScore}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 hover:bg-gray-700/30 rounded transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-white font-semibold text-sm">
                {match.awayTeam}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-white bg-gray-700 px-3 py-1 rounded">
                {match.awayScore}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCard;
