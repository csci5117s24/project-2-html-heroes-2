import React, { useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";

function CaptureReceipt() {
    // https://blog.openreplay.com/capture-real-time-images-and-videos-with-react-webcam/
    const [img, setImg] = useState(null);
    const webcamRef = React.useRef(null);

    const videoConstraints = {
        width: 1000,
        height: 2000,
        facingMode: "environment",
    };

    const capture = useCallback(() => {
        if (webcamRef.current === null) {
            return;
        }
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    }, [webcamRef, setImg]);

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="py-2 px-4 text-3xl font-bold">Capture Receipt</h1>
            </div>
            {img === null ? (
            <>
                    <div className="flex justify-center">
                        <Webcam
                        audio={false}
                        mirrored={false}
                        height={400}
                        width={400}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        />
                    </div>
                    <div className="flex justify-center m-3">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={capture}>
                            Capture
                        </button>
                    </div>
            </>
            ) : (
            <>
                <div className="flex justify-center">
                    <img src={img} alt="screenshot" />
                </div>
                <div className="flex justify-center m-3">
                    <Link to="/add-receipt" state={{img: img}}
                        className="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Confirm
                    </Link>
                    <button 
                        className="mx-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => setImg(null)}>
                        Retake
                    </button>
                </div>
            </>
            )}
        </div>
    );
}

export default CaptureReceipt;