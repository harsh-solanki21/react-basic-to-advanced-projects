import { useState } from 'react'
import './bgchanger.css'

const BgChanger = () => {
  const colors: string[] = [
    'red',
    'green',
    'blue',
    'gray',
    'yellow',
    'pink',
    'purple',
    'orange',
  ]
  const [newColor, setNewColor] = useState<string>('powderblue')

  return (
    <div style={{ height: '100vh', background: newColor }}>
      {colors.map((color, id) => {
        return (
          <button
            key={id}
            style={{ backgroundColor: color }}
            onClick={() => setNewColor(color)}
          >
            {color}
          </button>
        )
      })}
    </div>
  )
}

export default BgChanger
