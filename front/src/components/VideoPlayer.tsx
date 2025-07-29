import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { MdSubtitles, MdSettings } from 'react-icons/md';
import { BsFillSkipEndFill, BsFillSkipStartFill } from 'react-icons/bs';

interface VideoPlayerProps {
  title: string;
  subtitle: string;
  videoSrc: string;
  nextEpisode: () => void;
  prevEpisode: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ title, subtitle, videoSrc, nextEpisode, prevEpisode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerRef.current) {
      playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={playerRef}
      className="relative w-full bg-black aspect-video group"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={videoSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onClick={togglePlay}
        poster="https://via.placeholder.com/1920x1080"
      />

      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-between transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="p-4 flex justify-between items-center">
          <button
            className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            onClick={() => window.history.back()}
          >
            <IoIosArrowBack size={24} />
          </button>
          <div className="text-white text-lg font-semibold">
            {title} <span className="text-gray-300 text-sm">{subtitle}</span>
          </div>
          <div className="flex space-x-2">
            <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
              <MdSubtitles size={20} />
            </button>
            <button
              className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              onClick={() => setShowSettings(!showSettings)}
            >
              <MdSettings size={20} />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-8">
          <button className="text-white hover:bg-white/10 p-3 rounded-full transition-colors" onClick={prevEpisode}>
            <BsFillSkipStartFill size={28} />
          </button>
          <button className="text-white bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors" onClick={togglePlay}>
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <button className="text-white hover:bg-white/10 p-3 rounded-full transition-colors" onClick={nextEpisode}>
            <BsFillSkipEndFill size={28} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white text-xs">{formatTime(duration)}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button className="text-white hover:bg-white/10 p-1 rounded transition-colors" onClick={togglePlay}>
                {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
              </button>
              <button className="text-white hover:bg-white/10 p-1 rounded transition-colors" onClick={toggleMute}>
                {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <button className="text-white hover:bg-white/10 p-1 rounded transition-colors" onClick={toggleFullscreen}>
              {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="absolute right-4 bottom-16 bg-gray-900/90 p-4 rounded w-48">
          <div className="space-y-3">
            <div>
              <h4 className="text-white text-sm mb-1">Calidad</h4>
              <select className="w-full bg-gray-800 text-white text-sm p-1 rounded">
                <option>Auto</option>
                <option>1080p</option>
                <option>720p</option>
                <option>480p</option>
              </select>
            </div>
            <div>
              <h4 className="text-white text-sm mb-1">Velocidad</h4>
              <select className="w-full bg-gray-800 text-white text-sm p-1 rounded">
                <option>Normal</option>
                <option>0.5x</option>
                <option>0.75x</option>
                <option>1.25x</option>
                <option>1.5x</option>
                <option>2x</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
