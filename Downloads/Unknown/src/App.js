// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import "./styles.css";

// const NUM_ROWS = 4;
// const NUM_COLS = 3;
// const PIECE_SIZE = 80; // ขนาดชิ้นจิ๊กซอว์ที่เล็กลง

// const OFFSET_X = 200; // ขยับตำแหน่งแนวนอน
// const OFFSET_Y = 100; // ขยับตำแหน่งแนวตั้ง

// const createGrid = () =>
//   Array.from({ length: NUM_ROWS * NUM_COLS }, (_, index) => ({
//     id: index,
//     targetX: (index % NUM_COLS) * 100 + OFFSET_X, // 🔥 ขยับกรอบเป้าหมาย
//     targetY: Math.floor(index / NUM_COLS) * 100 + OFFSET_Y, // 🔥 ขยับกรอบเป้าหมาย
//     initialX: 500 + Math.random() * 50, // 🔥 จุดเริ่มต้นของจิ๊กซอว์
//     initialY: 300 + Math.random() * 50,
//     image: `/img/puzzle/piece${index + 1}.png`, 
//   }));


// export default function App() {
//   const [pieces, setPieces] = useState(createGrid());

//   const handleDragEnd = (event, info, piece) => {
//     const target = pieces.find((p) => p.id === piece.id);

//     console.log(`🟢 Piece ${piece.id} Dragged to:`, {
//       draggedX: info.point.x,
//       draggedY: info.point.y,
//       targetX: target.targetX,
//       targetY: target.targetY,
//     });

//     if (
//       Math.abs(info.point.x - target.targetX) < PIECE_SIZE * 0.75 &&
//       Math.abs(info.point.y - target.targetY) < PIECE_SIZE * 0.75
//     )
//      {
//       setPieces((prev) =>
//         prev.map((p) =>
//           p.id === piece.id
//             ? { ...p, initialX: target.targetX, initialY: target.targetY, locked: true }
//             : p
//         )
//       );
//     }
//   };

//   return (
//     <div className="board" style={{ position: "relative", width: "100vw", height: "100vh" }}>
//       {/* กรอบเป้าหมาย */}
//       {pieces.map((piece) => (
//         <div
//           key={`target-${piece.id}`}
//           className="target"
//           style={{
//             left: piece.targetX,
//             top: piece.targetY,
//             width: PIECE_SIZE,
//             height: PIECE_SIZE,
//             position: "absolute",
//             border: "2px dashed #ccc",
//           }}
//         />
//       ))}

//       {/* ชิ้นจิ๊กซอว์ */}
//       {pieces.map((piece) => (
//         <motion.div
//           key={`piece-${piece.id}`}
//           className="piece"
//           style={{
//             position: "absolute",
//             cursor: piece.locked ? "default" : "grab",
//           }}
//           drag={!piece.locked} // ✅ ล็อคชิ้นส่วนถ้าลากไปวางแล้ว
//           dragElastic={0.5}
//           initial={{ x: piece.initialX, y: piece.initialY }}
//           animate={{ x: piece.initialX, y: piece.initialY }} // ✅ ใช้ค่าที่อัปเดตล่าสุด
//           onPointerDown={(event) => event.preventDefault()} // ป้องกัน Safari ลากรูปออก
//           onDragStart={(event) => event.preventDefault()} // ป้องกันการดึงรูปออกจากเว็บ
//           onDragEnd={(event, info) => handleDragEnd(event, info, piece)}
//         >
//           <img
//             src={piece.image}
//             alt={`piece-${piece.id}`}
//             style={{
//               width: `${PIECE_SIZE}px`, // ✅ กำหนดขนาดเป็นสัดส่วน
//               height: `${PIECE_SIZE}px`,
//               objectFit: "contain",
//             }}
//           />
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// 2

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import "./styles.css";

// const NUM_ROWS = 4;
// const NUM_COLS = 3;
// const boardImage = "/img/puzzleboard.png";

// export default function App() {
//   const boardRef = useRef(null);
//   const [pieces, setPieces] = useState([]);
//   const [targets, setTargets] = useState([]);
//   const [completed, setCompleted] = useState([]);

//   useEffect(() => {
//     if (boardRef.current) {
//       const rect = boardRef.current.getBoundingClientRect();

//       // ✅ คำนวณตำแหน่งของเป้าหมายบนกระดาน
//       const newTargets = Array.from({ length: NUM_ROWS * NUM_COLS }, (_, index) => ({
//         id: index,
//         targetX: (index % NUM_COLS) * (rect.width / NUM_COLS),
//         targetY: Math.floor(index / NUM_COLS) * (rect.height / NUM_ROWS),
//       }));

//       // ✅ กระจายชิ้นส่วนอยู่ด้านซ้ายของกระดาน
//       const newPieces = newTargets.map((target, index) => ({
//         ...target,
//         initialX: rect.left - 200 + (index % 2) * 50, // 🔥 ปรับให้อยู่ฝั่งซ้าย
//         initialY: rect.top + Math.random() * (rect.height - 100),
//         image: `/img/puzzle/piece${target.id + 1}.png`,
//         width: rect.width / NUM_COLS,
//         height: rect.height / NUM_ROWS,
//       }));

//       setTargets(newTargets);
//       setPieces(newPieces);
//     }
//   }, []);

//   const handleDragEnd = (event, info, piece) => {
//     const target = targets.find((t) => t.id === piece.id);

//     if (
//       Math.abs(info.point.x - target.targetX) < piece.width / 2 &&
//       Math.abs(info.point.y - target.targetY) < piece.height / 2
//     ) {
//       setCompleted((prev) => [...prev, piece.id]);
//       setPieces((prev) =>
//         prev.map((p) =>
//           p.id === piece.id ? { ...p, initialX: target.targetX, initialY: target.targetY } : p
//         )
//       );
//     }
//   };

//   return (
//     <div className="container">
//       <div 
//   className="board" 
//   ref={boardRef}
//   style={{
//     backgroundImage: `url(${boardImage})`,
//     backgroundSize: "contain",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     width: "600px", // กำหนดขนาดให้กระดาน
//     height: "800px"
//   }}
// > 
// </div>


//       {pieces.map((piece) => (
//         <motion.div
//           key={piece.id}
//           className="piece"
//           style={{
//             position: "absolute",
//             cursor: "grab",
//             width: piece.width,
//             height: piece.height,
//             zIndex: 10, // ✅ ให้ชิ้นส่วนอยู่ด้านบน
//           }}
//           drag={!completed.includes(piece.id)}
//           dragElastic={0.5}
//           initial={{ x: piece.initialX, y: piece.initialY }}
//           animate={{ x: piece.initialX, y: piece.initialY }}
//           onPointerDown={(event) => event.preventDefault()}
//           onDragStart={(event) => event.preventDefault()}
//           onDragEnd={(event, info) => handleDragEnd(event, info, piece)}
//         >
//           <img
//             src={piece.image}
//             alt={`piece-${piece.id}`}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "contain",
//             }}
//           />
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// 3

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./styles.css";

const NUM_ROWS = 4;
const NUM_COLS = 3;
const boardImage = "/img/artboard6.png"; // ✅ เปลี่ยนเป็น Path รูปของกระดานจริง

export default function App() {
  const boardRef = useRef(null);
  const [pieces, setPieces] = useState([]);
  const [targets, setTargets] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();

      // ✅ สร้างตำแหน่งของเป้าหมาย (Target Grid)
      const newTargets = Array.from({ length: NUM_ROWS * NUM_COLS }, (_, index) => ({
        id: index,
        targetX: (index % NUM_COLS) * (rect.width / NUM_COLS),
        targetY: Math.floor(index / NUM_COLS) * (rect.height / NUM_ROWS),
      }));

      // ✅ สร้างชิ้นจิ๊กซอว์ให้อยู่ฝั่งซ้าย
      const newPieces = newTargets.map((target, index) => ({
        ...target,
        initialX: rect.left - 200 + Math.random() * 50, // กระจายฝั่งซ้าย
        initialY: rect.top + Math.random() * rect.height,
        image: `/img/puzzle/piece${index + 1}.png`, // ✅ ใส่ path รูปที่ถูกต้อง
        width: rect.width / NUM_COLS,
        height: rect.height / NUM_ROWS,
      }));

      setTargets(newTargets);
      setPieces(newPieces);
    }
  }, []);

  const handleDragEnd = (event, info, piece) => {
    const target = targets.find((t) => t.id === piece.id);

    if (
      Math.abs(info.point.x - target.targetX) < piece.width / 3 &&
      Math.abs(info.point.y - target.targetY) < piece.height / 3
    ) {
      setCompleted((prev) => [...prev, piece.id]);
      setPieces((prev) =>
        prev.map((p) => (p.id === piece.id ? { ...p, initialX: target.targetX, initialY: target.targetY } : p))
      );
    }
  };

  return (
    <div className="container">
      <div className="board-container">
        {/* ✅ กระดานจิ๊กซอว์ */}
        <div className="board" ref={boardRef}>
          <img src={boardImage} alt="Puzzle Board" className="board-image" />
        </div>

        {/* ✅ ชิ้นจิ๊กซอว์ */}
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="piece"
            style={{
              width: piece.width,
              height: piece.height,
              position: "absolute",
              cursor: "grab",
            }}
            drag={!completed.includes(piece.id)}
            dragElastic={0.5}
            initial={{ x: piece.initialX, y: piece.initialY }}
            animate={{ x: piece.initialX, y: piece.initialY }}
            onDragEnd={(event, info) => handleDragEnd(event, info, piece)}
          >
            <img
              src={piece.image}
              alt={`piece-${piece.id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
