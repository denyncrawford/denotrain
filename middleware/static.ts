import { Router, Request } from "../mod.ts";

export class TrainStatic extends Router {
  constructor(private root: string) {
    super();
    this.get(async (req: Request) => {
      let joinPath = new URL(this.root + (req.relPath || "/index.html"), window.location.href).pathname;
      joinPath = Deno?.build.os == "win" ? joinPath.substring(1) : joinPath;
      const successful = await req.file(joinPath);
      if (successful)
        return true;
    });
  }
}
