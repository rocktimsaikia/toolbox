export default function Footer() {
  const linkClass = "font-medium text-foreground hover:underline underline-offset-4";
  return (
    <footer className="row-start-3 flex justify-center text-sm text-muted-foreground">
      <p>
        <a
          href="https://github.com/rocktimsaikia/toolbox"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Source on GitHub
        </a>
        <span aria-hidden="true"> · </span>
        Built by{" "}
        <a
          href="https://rocktim.dev"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          @rocktimsaikia
        </a>
      </p>
    </footer>
  );
}
