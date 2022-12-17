import { useState } from "react";
import { DrawingPath } from "./DrawingPath";

export function ArtBoard() {
  const [points, setPoints] = useState<any | null>();
  const [paths, setPaths] = useState<any | null>([]);

  function handlePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    setPoints([[e.pageX, e.pageY, e.pressure]]);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (e.buttons === 1) {
      e.preventDefault();
      // console.log(points)
      setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
    }
  }
  // function renderExisting(e: React.PointerEvent) {
  //   e.preventDefault();
  //   // console.log(paths)
  //   if (paths === []) {
  //     setPaths([points]);
  //   } else {
  //     setPaths(paths.concat([points]));
  //   }
  // }
  return (
    <>
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={renderExisting}
        style={{ touchAction: "none" }}
      >
        {
          // paths.map((pathItem: number | null | undefined) => <DrawingPath path={pathItem} />)
          paths.map(
            (pathItem: any) => pathItem && <DrawingPath pathItem={pathItem} />
          )
        }
        {points && (
          <DrawingPath pathItem={points} />
          // Honestly so pleased I got this to work
        )}
      </svg>
    </>
  );
}
