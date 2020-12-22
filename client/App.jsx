import React, { useEffect } from 'react'

export default () => {
  useEffect(() => {
    (async () => {
      const data = await fetch('/api/hello')
        .then(res => res.text())
        .then(text => text)
        .catch(err => console.log(err));

      console.log(data)
    })()
  }, [])

  return (
    <div>
      hello aha :D
    </div>
  )
}