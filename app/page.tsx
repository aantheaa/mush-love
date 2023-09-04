import Image from 'next/image'
import styles from './page.module.css'
import {useState} from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [imageData, setImageData] = useState(null);

  const handleSend = async () => {
    try {
      const response = await axios.post('/api/getImage', { text: input });
      const { data } = response.data;
      setImageData(`data:image/jpeg;base64,${data}`);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <main >
      <div>
        <div>
          By Anthea
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSend}>Send</button>
        {imageData && <img src={imageData} alt="Fetched" />}
      </div>
      <p>welcome to mush love</p>


    </main>
  )
}
