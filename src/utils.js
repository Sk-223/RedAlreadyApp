function createEmbedURL(videoUrl) {
    if (!videoUrl) {  // If videoUrl is undefined, null, or an empty string
        return ''; // Return an empty string or a placeholder URL 
    }
    console.log("videoUrl in utils.js:", videoUrl); // Log the videoUrl before processing
    let videoId = videoUrl.split('v=')[1]; // Extract the video ID
    const ampersandPosition = videoId.indexOf('&'); // Check for additional query parameters
    if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition); // Trim them off
    }
    return `https://www.youtube.com/embed/${videoId}?controls=1&autoplay=1`;
};

export default createEmbedURL;

