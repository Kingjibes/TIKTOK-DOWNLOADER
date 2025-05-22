import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Download, Loader2, AlertTriangle, Film, CheckCircle, ExternalLink, Info, PlayCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const API_BASE_URL = 'https://apis.davidcyriltech.my.id/download/tiktok?url=';

const HomePage = () => {
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const isValidTikTokUrl = (url) => {
    const tiktokRegex = /^(https|http):\/\/(www\.|vm\.|vt\.)?tiktok\.com\/.+/;
    return tiktokRegex.test(url);
  };

  const handleDownload = useCallback(async () => {
    if (!tiktokUrl) {
      setError('Please paste a TikTok video URL.');
      toast({
        variant: "destructive",
        title: "Input Error",
        description: "TikTok video URL cannot be empty.",
      });
      return;
    }

    if (!isValidTikTokUrl(tiktokUrl)) {
      setError('Invalid TikTok URL. Please enter a valid link.');
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "The URL provided doesn't look like a TikTok link.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const response = await fetch(`${API_BASE_URL}${encodeURIComponent(tiktokUrl)}`);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}. Please try again later.`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to download video");
      }

      if (data && data.result && data.result.video) {
        const result = data.result;
        const formattedData = {
          video: result.video,
          video_nosign: result.video, // Using the same video URL since no separate no-watermark version
          video_hd: result.video, // Using the same video URL since no separate HD version
          music: result.music,
          images: result.author?.avatar ? [result.author.avatar] : [],
          title: result.desc || '',
          author_name: result.author?.nickname || '',
          description: result.desc || '',
          cover: result.author?.avatar,
          thumbnail: result.author?.avatar,
          url_original: tiktokUrl,
          statistics: result.statistics
        };

        setVideoData(formattedData);
        toast({
          title: "Video Ready!",
          description: "Your TikTok video is ready for download.",
          action: <CheckCircle className="text-green-500" />,
        });
      } else {
        throw new Error("No video URL found in the response");
      }
    } catch (err) {
      console.error("API Error:", err);
      const displayErrorMessage = err.message || 'An unexpected error occurred. Please try again.';
      setError(displayErrorMessage);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: displayErrorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [tiktokUrl, toast]);

  const renderDownloadOptions = () => {
    if (!videoData) return null;

    const downloadLinks = [];
    
    if (videoData.video) {
      downloadLinks.push({ label: "Download Video", url: videoData.video, type: "video" });
    }
    
    if (videoData.music) {
      downloadLinks.push({ label: "Download Music", url: videoData.music, type: "audio" });
    }
    
    if (videoData.images && videoData.images.length > 0) {
      videoData.images.forEach((imgUrl, index) => {
        downloadLinks.push({ label: `Download Profile Image ${index + 1}`, url: imgUrl, type: "image" });
      });
    }

    if (downloadLinks.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-4">
          No download options available for this video
        </div>
      );
    }

    return downloadLinks.map((link) => (
      <Button
        key={link.url}
        asChild
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 mb-2"
      >
        <a href={link.url} target="_blank" rel="noopener noreferrer" download>
          <Download className="mr-2 h-5 w-5" /> {link.label}
        </a>
      </Button>
    ));
  };
  
  const getPreviewableVideoUrl = () => {
    if (!videoData) return null;
    return videoData.video;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 flex flex-col items-center"
    >
      <Card className="w-full max-w-2xl shadow-2xl bg-card/80 backdrop-blur-md border-primary/30 overflow-hidden">
        <CardHeader className="text-center p-8 bg-gradient-to-br from-primary/10 via-background to-background">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent shadow-lg"
          >
            <DownloadCloud className="h-10 w-10 text-primary-foreground" />
          </motion.div>
          <CardTitle className="text-3xl md:text-4xl font-extrabold gradient-text">
            TikTok Video Downloader
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm md:text-base mt-2">
            Paste your TikTok video link below to download it without watermarks, in HD, or as audio.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="space-y-3">
            <label htmlFor="tiktok-url" className="text-sm font-medium text-foreground sr-only">TikTok URL</label>
            <Input
              id="tiktok-url"
              type="url"
              placeholder="Paste TikTok video URL here (e.g., https://www.tiktok.com/@user/video/123...)"
              value={tiktokUrl}
              onChange={(e) => {
                setTiktokUrl(e.target.value);
                if(error) setError(null);
              }}
              className="h-12 text-base border-2 border-input focus:border-primary focus:ring-primary transition-colors"
              aria-label="TikTok video URL input"
            />
          </div>

          <Button
            onClick={handleDownload}
            disabled={isLoading}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Download TikTok video"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-6 w-6" /> Get Video
              </>
            )}
          </Button>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-md flex items-start space-x-3"
                role="alert"
              >
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <AnimatePresence>
          {videoData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border/20"
            >
              <CardFooter className="p-6 md:p-8 flex flex-col space-y-6">
                <Card className="w-full bg-background/50 p-4 rounded-lg shadow-inner">
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-xl flex items-center">
                      <Film className="mr-2 h-6 w-6 text-primary" /> Video Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {videoData.cover && (
                      <div className="aspect-video rounded-md overflow-hidden mb-3 shadow-md">
                        <img 
                          src={videoData.cover} 
                          alt={videoData.title || 'TikTok Video Preview'} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/600x400?text=Preview+Not+Available';
                          }}
                        />
                      </div>
                    )}
                    {videoData.title && <p className="text-sm font-semibold text-foreground mb-1">{videoData.title}</p>}
                    {videoData.author_name && <p className="text-xs text-muted-foreground">By: @{videoData.author_name}</p>}
                    {videoData.statistics && (
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        <span>❤️ {videoData.statistics.likeCount?.toLocaleString() || 0}</span>
                        <span>💬 {videoData.statistics.commentCount?.toLocaleString() || 0}</span>
                        <span>↗️ {videoData.statistics.shareCount?.toLocaleString() || 0}</span>
                        <span>▶️ {videoData.statistics.playCount?.toLocaleString() || 0}</span>
                      </div>
                    )}
                     
                     {getPreviewableVideoUrl() && (
                        <Button
                          variant="outline"
                          className="w-full mt-4"
                          onClick={() => window.open(getPreviewableVideoUrl(), '_blank')}
                        >
                          <PlayCircle className="mr-2 h-5 w-5" /> Watch Preview
                        </Button>
                      )}
                  </CardContent>
                </Card>

                <div className="w-full space-y-3">
                  {renderDownloadOptions()}
                </div>
                
                <Button variant="link" asChild className="text-sm text-muted-foreground hover:text-primary">
                  <a href={videoData.url_original} target="_blank" rel="noopener noreferrer">
                    View original on TikTok <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Card className="w-full max-w-2xl mt-12 shadow-xl bg-card/80 backdrop-blur-md border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Info className="mr-3 h-7 w-7 text-primary" /> How to Use
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>1. Open the TikTok app or website and find the video you want to download.</p>
          <p>2. Tap the "Share" button and then "Copy Link".</p>
          <p>3. Paste the copied link into the input field above.</p>
          <p>4. Click the "Get Video" button.</p>
          <p>5. Choose your preferred download option (e.g., HD, no watermark, audio).</p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground p-6 border-t border-border/20">
           <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
           Please ensure you respect copyright and download videos responsibly. This tool is for personal use only.
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default HomePage;

const DownloadCloud = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
    <path d="M12 12v9"/>
    <path d="m8 17 4 4 4-4"/>
  </svg>
);
