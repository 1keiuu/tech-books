import { generateSettingsJson } from "../../../bin/utils/file";

test("function 'generateSettingsJson' returns perfect data.", () => {
  const data = {
    id: 1,
    slug: "test",
    name: "テスト",
  };
  expect(generateSettingsJson(data.id, data.slug, data.name)).toStrictEqual(
    data
  );
});

test("function 'generateSettingsJson' returns 'unset' data.", () => {
  const data = {
    id: 1,
  };
  expect(generateSettingsJson(data.id)).toStrictEqual({
    id: 1,
    slug: "unset",
    name: "未設定",
  });
});
