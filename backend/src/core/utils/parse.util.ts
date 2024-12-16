export default class ParseUtil {
  static parseLine(line: string) {
    console.log(line);
    const data = line.split(";");
    const parsed: any = {};
    data.forEach((item: string) => {
      const [key, value] = item.split(":");
      if (key && value) {
        parsed[key] = value.trim();
      }
    })
    return parsed;
  }
}
