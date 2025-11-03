import { Calendar, CheckCircle, Radio } from "lucide-react";
import { Match } from "@/types/matches";

const useMatchCardLayoutHelper = (
  match: Match,
  isNew: boolean = false,
  isRemoving: boolean = false
) => {
  const formatTime = (time: string) => {
    try {
      return new Date(time).toLocaleTimeString("sr-RS", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return time;
    }
  };

  const getAnimationStyles = () => {
    if (isNew) {
      return "bg-gray-800 border border-green-400/50 shadow-xl";
    }
    if (isRemoving) {
      return "bg-gray-800 border border-red-400/50 shadow-xl";
    }
    return "bg-gray-800 border border-gray-600 hover:border-gray-500";
  };

  const cardAnimationVariants = {
    initial: { scale: 0.95, opacity: 0, y: 10 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: {
      scale: 0.95,
      opacity: 0,
      y: -10,
      transition: { duration: 0.5 },
    },
    new: {
      scale: 1.02,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        duration: 0.8,
      },
    },
    removing: {
      scale: 0.98,
      opacity: 0.7,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getTransition = () => {
    if (isNew) return { duration: 2.5 };
    if (isRemoving) return { duration: 2.5 };
    return {
      duration: 0.3,
      layout: {
        duration: 0.8,
      },
    };
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "live":
        return {
          text: "UŽIVO",
          className:
            "bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded-full text-xs font-bold",
          icon: <Radio className="w-3 h-3 text-red-400" />,
        };
      case "finished":
        return {
          text: "ZAVRŠEN",
          className:
            "bg-gray-500/20 text-gray-400 border border-gray-500/30 px-2 py-1 rounded-full text-xs",
          icon: <CheckCircle className="w-3 h-3 text-gray-400" />,
        };
      case "upcoming":
        return {
          text: "SLEDEĆI",
          className:
            "bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded-full text-xs",
          icon: <Calendar className="w-3 h-3 text-blue-400" />,
        };
      default:
        return {
          text: status,
          className:
            "bg-gray-500/20 text-gray-300 border border-gray-500/30 px-2 py-1 rounded-full text-xs",
          icon: null,
        };
    }
  };
  const statusInfo = getStatusInfo(match.status);

  return {
    formatTime,
    getAnimationStyles,
    cardAnimationVariants,
    getTransition,
    statusInfo,
  };
};

export default useMatchCardLayoutHelper;
