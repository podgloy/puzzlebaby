import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./styles.css";

// const NUM_ROWS = 4;
// const NUM_COLS = 3;
const backgroundOverlay = {
  backgroundImage: `url('/img/bgoverlay.png')`, 
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  width: "100vw",
  height: "100vh",
};

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
      // const newTargets = Array.from({ length: NUM_ROWS * NUM_COLS }, (_, index) => ({
      //   id: index,
      //   targetX: (index % NUM_COLS) * (rect.width / NUM_COLS),
      //   targetY: Math.floor(index / NUM_COLS) * (rect.height / NUM_ROWS),
      // }));
      const newTargets = [
        { id: 0, targetX: rect.left + 495.2, targetY: rect.top + 118 },  // 🔹 ชิ้นที่ 1
        { id: 1, targetX: rect.left + 604.9, targetY: rect.top + 130 }, // 🔹 ชิ้นที่ 2
        { id: 2, targetX: rect.left + 735, targetY: rect.top + 103 }, // 🔹 ชิ้นที่ 3
        { id: 3, targetX: rect.left + 502, targetY: rect.top + 228 }, // 🔹 ชิ้นที่ 4
        { id: 4, targetX: rect.left + 620, targetY: rect.top + 250 }, // 🔹 ชิ้นที่ 5
        { id: 5, targetX: rect.left + 743, targetY: rect.top + 214 }, // 🔹 ชิ้นที่ 6
        { id: 6, targetX: rect.left + 528, targetY: rect.top + 358 },  // 🔹 ชิ้นที่ 7
        { id: 7, targetX: rect.left + 658, targetY: rect.top + 390 }, // 🔹 ชิ้นที่ 8
        { id: 8, targetX: rect.left + 770, targetY: rect.top + 364 }, // 🔹 ชิ้นที่ 9
        { id: 9, targetX: rect.left + 516, targetY: rect.top + 489 }, // 🔹 ชิ้นที่ 10         
        { id: 10, targetX: rect.left + 627, targetY: rect.top + 500 }, // 🔹 ชิ้นที่ 11
        { id: 11, targetX: rect.left + 757, targetY: rect.top + 496 }, // 🔹 ชิ้นที่ 12         
        // { id: 12, targetX: rect.left + 350, targetY: rect.top + 200 }, // 🔹 ชิ้นที่ 6
    
      ];
  

      // ✅ สร้างชิ้นจิ๊กซอว์ให้อยู่ฝั่งซ้าย
      const newPieces = newTargets.map((target, index) => ({
        ...target,
        initialX: rect.left - 520 + Math.random() * 230, // กระจายฝั่งซ้าย
        initialY: rect.top - 0 + Math.random() * 200,
        image: `/img/puzzle/artboard${index + 1}.png`, // ✅ ใส่ path รูปที่ถูกต้อง
        // width: rect.width / NUM_COLS,
        // height: rect.height / NUM_ROWS,
        width: 218,  // ✅ แก้ขนาดให้ตรงกับ Artboard
        height: 218
      }));
      // console.log("Piece ID:", piece.id, "Current Position:", piece.x, piece.y);


      setTargets(newTargets);
      setPieces(newPieces);
    }
  }, []);

  const handleDragEnd = (event, info, piece) => {
    const target = targets.find((t) => t.id === piece.id);

    const distanceX = Math.abs(info.point.x - target.targetX);
    const distanceY = Math.abs(info.point.y - target.targetY);

    if (distanceX < piece.width / 8 && distanceY < piece.height / 8) {
    //   console.log(`Piece ${piece.id} is very close to target`);

      
    //   setCompleted((prev) => [...prev, piece.id]);
    
    setPieces((prev) =>
      prev.map((p) =>
        p.id === piece.id
          ? { ...p, 
            initialX: target.targetX, 
            initialY: target.targetY, 
            targetX: target.targetX,  // เก็บตำแหน่งเป้าหมาย
            targetY: target.targetY,
            // initialX: finalX,  // ใช้ finalX และ finalY เพื่ออัปเดตตำแหน่ง
            //   initialY: finalY,
            isLocked: true, }
          : p
      )
    );
  }
};

  return (
    <div style={backgroundOverlay}>
    <div className="container">
      <div className="board-container">
        {/* ✅ กระดานจิ๊กซอว์ */}
        <div className="board" ref={boardRef}>
          <img src={boardImage} alt="Puzzle Board" className="board-image" />
          
          {targets.map((target) => (
  <div
    key={target.id}
    className="target"
    style={{
      left: target.targetX,
      top: target.targetY,
      width: 218, // ✅ ให้ขนาดเท่ากับชิ้นจิ๊กซอว์
      height: 218,
      position: "absolute",
      // border: "2px dashed rgba(255, 0, 0, 0.5)",  // ✅ เพิ่มสีแดงโปร่งแสง
      // backgroundColor: "rgba(255, 0, 0, 0.1)",  // ✅ ให้มีสีจางๆ เพื่อให้เห็นเป้าหมาย
    }}
  />
))}

</div>

        {/* ✅ ชิ้นจิ๊กซอว์ */}
        {pieces.map((piece) => (
          <motion.div
            onPointerDown={(event) => event.preventDefault()}  
            onDragStart={(event) => event.preventDefault()}
            key={piece.id}
            className="piece"
            style={{
              width: piece.width,
              height: piece.height,
              position: "absolute",
              cursor: piece.isLocked ? "default" : "grab",
            }}
            drag={!piece.isLocked}
            // drag={!completed.includes(piece.id)}
            dragElastic={0.5}
            initial={{ x: piece.initialX, y: piece.initialY }}
            animate={piece.isLocked ? { x: piece.targetX, y: piece.targetY } : { x: piece.initialX, y: piece.initialY }}  // ถ้าล็อคแล้วให้ใช้ตำแหน่งที่ล็อค
            onDragEnd={(event, info) => handleDragEnd(event, info, piece)}
          >
            <img
              src={piece.image}
              alt={`piece-${piece.id}`}
              style={{
                width: piece.width, 
                height: piece.height,
                objectFit: "contain",
              }}
            />
          </motion.div>
        ))}

{/* {targets.map((target) => (
  <div
    key={target.id}
    className={`target ${completed.includes(target.id) ? "completed" : ""}`}  // ใช้คลาส "completed" ถ้า target เสร็จแล้ว
    style={{
      left: target.targetX,
      top: target.targetY,
      width: 218,
      height: 218,
      position: "absolute",
      border: completed.includes(target.id)
        ? "2px solid green" // ถ้าเสร็จแล้วใช้กรอบสีเขียว
        : "2px dashed rgba(255, 0, 0, 0.5)", // ถ้ายังไม่เสร็จใช้กรอบสีแดง
      backgroundColor: completed.includes(target.id)
        ? "rgba(0, 255, 0, 0.1)"  // สีพื้นหลังเขียวเมื่อเสร็จ
        : "rgba(255, 0, 0, 0.1)",  // สีพื้นหลังแดงเมื่อยังไม่เสร็จ
    }}
  />
))} */}

      </div>
    </div>
    </div>
  );

}
