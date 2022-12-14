import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { invoke } from '@tauri-apps/api/tauri'
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { setDefaultResultOrder } from 'dns'



export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [result, setResult] = useState<string>("");

  function onKeydown(key: string) {
    if (key == 'Enter'){
      invoke<string>('cmd', { input: inputText })
      .then((value) => setResult(value))
      .catch(console.error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Subrow</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Input command...
        </h3>
        <input type="text" className={styles.code}  placeholder="ls" onChange={(event) => setInputText(event.target.value)} onKeyDown={(e) => onKeydown(e.key)}/>
        <div className={styles.result}>
          {result}
        </div>        
      </main>

      
    </div>
  )
}
