import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './sections/Hero/Hero'
import Dilemma from './sections/Dilemma/Dilemma'
import Intelligence from './sections/Intelligence/Intelligence'
import Calculator from './sections/Calculator/Calculator'
import Recommendation from './sections/Recommendation/Recommendation'
import LiveData from './sections/LiveData/LiveData'
import Comparison from './sections/Comparison/Comparison'
import Architecture from './sections/Architecture/Architecture'
import FinalCTA from './sections/FinalCTA/FinalCTA'
import Chat from './sections/Chat/Chat'

function App() {
  const [recommendationData, setRecommendationData] = useState(null)
  const marketData = recommendationData
  ? [
      ...(recommendationData.recommendation
        ? [recommendationData.recommendation]
        : []),
      ...(recommendationData.alternatives || []),
    ]
  : []
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main>
        <Hero />
        <Dilemma data={recommendationData} />
        <Intelligence data={recommendationData}/>
        <Calculator onRecommendation={setRecommendationData} />
        <Recommendation data={recommendationData} />
        <Chat data={recommendationData}/>
        <LiveData markets={marketData} />
        <Comparison data={recommendationData} />
        <Architecture data={recommendationData}/>
        <FinalCTA />
      </main>
    </div>
  )
}

export default App