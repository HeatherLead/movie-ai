import React ,{useRef , useEffect} from "react";

export const useDragger = () =>{

    const boxRef = useRef <HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const isClicked = useRef<boolean>(false)
    const cords = useRef<{
        startX: number,
        startY: number,
        lastX:number,
        lastY:number,
    }>({
        startX :0,
        startY:0,
        lastX:0,
        lastY:0
    })

    useEffect(()=>{

        if(!boxRef.current || !containerRef.current) return;

        const box  =boxRef.current;
        const container = containerRef.current;

        const mouseDown = (event:MouseEvent) =>{
            isClicked.current = true;
            cords.current.startX = event.clientX;
            cords.current.startY = event.clientY

        }
        const mouseUp = () =>{
            isClicked.current = false;
            cords.current.lastX = box.offsetLeft
            cords.current.lastY = box.offsetTop 

        }
        const mouseMove = (event:MouseEvent) =>{
            if(!isClicked.current) return;

            const newX = event.clientX - cords.current.startX + cords.current.lastX
            const newY = event.clientY - cords.current.startY + cords.current.lastY
            box.style.top = `${newY}px`
            box.style.left = `${newX}px`

        }

        box.addEventListener("mousedown" ,mouseDown)
        box.addEventListener("mouseup" ,mouseUp)
        container.addEventListener("mouseenter",mouseMove)

        const cleanUp = () =>{
            box.removeEventListener("mousedown",mouseDown)
            box.removeEventListener("mouseup",mouseUp)
            container.removeEventListener("mouseenter",mouseMove)
        }
        return cleanUp;

    },[])
     
    return
}

