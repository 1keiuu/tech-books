const stdin = process.argv[2];

if (!stdin) {
  throw Error("Exit: Expected 1 argument. Please set directory name.");
}
