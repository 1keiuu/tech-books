import { generateSettingsJson } from "../../../bin/utils/file";

describe("function 'generateSettingsJson' ", () => {
  test("returns perfect data.", () => {
    const data = {
      id: 1,
      slug: "test",
      name: "テスト",
    };
    expect(generateSettingsJson(data.id, data.slug, data.name)).toStrictEqual(
      data
    );
  });

  test("returns 'unset' data.", () => {
    const data = {
      id: 1,
    };
    expect(generateSettingsJson(data.id)).toStrictEqual({
      id: 1,
      slug: "unset",
      name: "未設定",
    });
  });
});
test("", () => {
  console.log(jest.mock("fs"));
});
