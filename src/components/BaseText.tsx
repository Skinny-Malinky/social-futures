import { useState } from "react"
export function BaseText() {
  const [text, setText] = useState('Write it down');
  // function handleKeyDown(e: React.KeyboardEvent) {
  //   e.preventDefault();
  //   if(text==='Write it down') {
  //     setText(e.key);
  //   }
  //   else {
  //     setText(text + e.key);
  //   }
  // }
  return (
    <p
      contentEditable={true}
      tabIndex={0}>
      Write it down!
    </p >
  )
}