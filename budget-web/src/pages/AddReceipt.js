import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Webcam from "react-webcam";

function AddReceipt() {
  const location = useLocation();
  const [file, setFile] = useState(location.state?.img || null);
  const [total, setTotal] = useState(null);
  const [merchant, setMerchant] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  const hiddenFileInput = useRef(null);
  function handleClick() {
    hiddenFileInput.current.click();
  }

  function handleUpload(event) {
    if (event.target.files[0].type.startsWith("image/")) {
      setFile(URL.createObjectURL(event.target.files[0]));
    } else {
      setFile(null);
      alert("Please upload an image file.");
    }
  }

  function handleTotalChange(e) {
    e.preventDefault();
    setTotal(e.target.value);
  }

  function handleMerchantChange(e) {
    e.preventDefault();
    setMerchant(e.target.value);
  }

  async function readReceipt(file) {
    setLoading(true);
    const {
      AzureKeyCredential,
      DocumentAnalysisClient,
    } = require("@azure/ai-form-recognizer");

    const key = process.env.REACT_APP_RECEIPT_KEY;
    const endpoint =
      "https://5117-receipt-scanner.cognitiveservices.azure.com/";

    const client = new DocumentAnalysisClient(
      endpoint,
      new AzureKeyCredential(key)
    );

    // convert base64 to blob
    const response = await fetch(file);
    const blob = await response.blob();

    const poller = await client.beginAnalyzeDocument("prebuilt-receipt", blob);
    const {
      documents: [result],
    } = await poller.pollUntilDone();

    if (result) {
      const { MerchantName, Items, Total } = result.fields;

      console.log("=== Receipt Information ===");
      console.log("Type:", result.docType);
      console.log("Merchant:", MerchantName && MerchantName.content);

      console.log("Items:");
      for (const item of (Items && Items.values) || []) {
        const { Description, TotalPrice } = item.properties;

        console.log("- Description:", Description && Description.content);
        console.log("  Total Price:", TotalPrice && TotalPrice.content);
      }

      console.log("Total:", Total && Total.content);

      setTotal(Total && Total.content.replace(/[^0-9.-]+/g, ""));
      setMerchant(MerchantName && MerchantName.content);
      if (!MerchantName || !Total) {
        alert("Scan couldn't read all information. Please enter manually.");
      }
      setScanned(true);
      setLoading(false);
    } else {
      setLoading(false);
      alert("No receipt found.");
      setScanned(true);
    }
  }

  return (
    <>
      <div className="max-w-6xl p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Add Receipt
          </h1>
        </div>
        <div className="mb-4">
          <form>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Upload or Capture Receipt
            </label>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleUpload}
              style={{ display: "none" }}
            />
            <button
              className="m-2 p-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={(event) => {
                event.preventDefault();
                handleClick();
              }}
            >
              Upload Receipt
            </button>
            <Link
              to="/capture-receipt"
              className="m-2 p-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Take Picture
            </Link>
          </form>

          {file && (
            <>
              <div className="grid sm:grid-cols-2 gap-4 m-3 bg-gray-200 p-5 rounded-lg">
                <div>
                  <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                    Receipt Preview
                  </label>
                  <div className="flex justify-center items-center">
                    {file && (
                      <img
                        src={file}
                        alt="receipt"
                        style={{ maxHeight: "500px" }}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                      Receipt Information
                    </label>
                    {scanned ? (
                      <>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                            Description
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                            type="text"
                            name="description"
                            value={merchant}
                            onChange={handleMerchantChange}
                            placeholder="Enter description"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                            Value
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                            type="number"
                            name="total"
                            value={total}
                            onChange={handleTotalChange}
                            placeholder="Enter value"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Link
                            to="/add-transaction"
                            state={{ description: merchant, value: total }}
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          >
                            Continue to Transaction
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        {loading ? (
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                          </div>
                        ) : (
                          <button
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={() => readReceipt(file)}
                          >
                            Scan Receipt
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddReceipt;
