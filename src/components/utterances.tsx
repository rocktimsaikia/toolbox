"use client";

import { useEffect, useRef } from "react";

export default function Utterances() {
  const commentNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://utteranc.es/client.js";
    scriptElement.setAttribute("repo", "rocktimsaikia/toolbox");
    scriptElement.setAttribute("issue-term", "pathname");
    scriptElement.setAttribute("theme", "github-light");
    scriptElement.setAttribute("crossorigin", "anonymous");
    scriptElement.async = true;

    commentNodeRef.current?.appendChild(scriptElement);

    return () => {
      if (commentNodeRef.current) {
        commentNodeRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={commentNodeRef} className="mt-16" />;
}
