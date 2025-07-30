"use client";

import { useEffect, useRef } from "react";

interface UtterancesProps {
  path?: string;
}

export default function Utterances({ path }: UtterancesProps) {
  const commentNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://utteranc.es/client.js";
    scriptElement.setAttribute("repo", "rocktimsaikia/toolbox");
    scriptElement.setAttribute("issue-term", path ? `pathname:${path}` : "pathname");
    scriptElement.setAttribute("label", "comment");
    scriptElement.setAttribute("theme", "github-light");
    scriptElement.setAttribute("crossorigin", "anonymous");
    scriptElement.async = true;

    commentNodeRef.current?.appendChild(scriptElement);

    return () => {
      if (commentNodeRef.current) {
        commentNodeRef.current.innerHTML = "";
      }
    };
  }, [path]);

  return <div ref={commentNodeRef} className="mt-16" />;
}
