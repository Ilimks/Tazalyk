import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'


export const Loading: React.FC = () => {
    return (
        <Spiral
          size="60"
          speed="0.9"
          color="green" 
        />
    )
}