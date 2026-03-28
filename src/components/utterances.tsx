"use client";

import { useEffect, useRef, useState } from "react";

interface UtterancesProps {
  path?: string;
}

export default function Utterances({ path }: UtterancesProps) {
  const commentNodeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    if (commentNodeRef.current) {
      observer.observe(commentNodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !commentNodeRef.current) return;

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://utteranc.es/client.js";
    scriptElement.setAttribute("repo", "rocktimsaikia/toolbox");
    scriptElement.setAttribute("issue-term", path ? `pathname:${path}` : "pathname");
    scriptElement.setAttribute("label", "comment");
    scriptElement.setAttribute("theme", "github-light");
    scriptElement.setAttribute("crossorigin", "anonymous");
    scriptElement.async = true;

    commentNodeRef.current.appendChild(scriptElement);

    return () => {
      if (commentNodeRef.current) {
        commentNodeRef.current.innerHTML = "";
      }
    };
  }, [isVisible, path]);

  return <div ref={commentNodeRef} className="mt-16" />;
}
