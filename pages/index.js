import Head from 'next/head'
import Subscribers from '../components/Subscribers'
import Views from '@/components/Views'
import Videos from '@/components/Videos'
import Image from 'next/image'

export default function Home() {

  return (
    <div className='overflow-x-hidden'>
      <Head>
        <title>Crypto View Count</title>
        <meta name="description" content="Monitor Crypto Youtube views, subscriber counts and view count for free." />
        <meta name="keywords" content="Crypto, crypto dashboard, crypto analytics, crypto youtube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='flex min-h-screen w-screen justify-center items-center overflow-x-hidden overflow-y-auto'>
        <div className='flex flex-col justify-center items-center'>
          
          {/* Header */}
          <div className='flex space-x-3 justify-center items-center p-4'>
            <h1 className="text-3xl md:text-5xl text-center font-leckton font-semibold my-10 mx-auto">Crypto View Count</h1>
            <Image
              src='/meter.png'
              alt='meter'
              width={100}
              height={100}
              className="object-cover h-14 w-14 p-1"
            />
          </div>

          <div className='p-2 mx-4 grid grid-cols-1 md:grid-cols-2 max-w-6xl bg-gray-100 border rounded-lg shadow-lg mb-10'>

            {/* Text */}
            <div className=''>
              <div>
                <h2 className='px-6 py-4 text-2xl font-leckton font-semibold mx-auto text-center'>What is This?</h2>
              </div>
              <p className='px-6 py-2 text-lg'>This is data dashboard looking at the total number of subscribers, views and videos put out by the biggest Crypto YouTube channels.</p>
              <p className='px-6 py-2 text-lg'>The hope is that this will serve as a decent barometer for how hot the market is and therefore whether this is a good time to invest or not.</p>
            
              <h2 className='p-6 text-2xl font-leckton font-semibold mx-auto text-center'>What Crypto YouTube Channels are Included?</h2>
              <ul className='px-6 py-2 list-disc ml-10'>
                <li className='text-lg'>EllioTrades</li>
                <li className=' text-lg'>Bankless</li>
                <li className=' text-lg'>Altcoin Daily</li>
                <li className=' text-lg'>AltCoin Buzz</li>
                <li className=' text-lg'>CTO Larssen</li>
                <li className=' text-lg'>Coin Bureau</li>
                <li className=' text-lg'>BitBoy Crypto</li>
                <li className=' text-lg'>CryptosRUs</li>
                <li className=' text-lg'>JRNY Crypto</li>
                <li className=' text-lg'>Benjamin Cowan</li>
                <li className=' text-lg'>Lark Davis</li>
              </ul>

              <h2 className='p-6 text-2xl font-leckton font-semibold mx-auto text-center'>When Does This Data Update?</h2>
              <p className='px-6 py-2 text-lg'>Once per day.</p>

              <h2 className='p-6 text-2xl font-leckton font-semibold mx-auto text-center'>Nice Site. Who is the Dev?</h2>
              <a className='cursor-pointer' href="https://twitter.com/phas0r" target="_blank" rel="noopener noreferrer"><p className='px-6 text-lg underline text-blue-500'>@Phas0r</p></a>

            </div>


            {/* Graphs */}
            <div className="flex flex-col items-center justify-center">
              <Subscribers/>
              <Views/>
              <Videos/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
