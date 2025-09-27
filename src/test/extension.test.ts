import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { divineWords, toCamelCase, toKebabCase, toPascalCase, toScreamingSnakeCase, toSnakeCase, toTrainCase, wordCapitalize } from '../variableCorrector';
import { formatClassNameByLanguage, formatConstantNameByLanguage, formatFunctionNameByLanguage, formatVariableNameByLanguage } from '../languageSwitch';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('words to name', () => {
		assert.strictEqual("Data", wordCapitalize("data"));

		const testCase = ["get", "data", "case"];

		assert.strictEqual("getDataCase", toCamelCase(testCase));
		assert.strictEqual("GetDataCase", toPascalCase(testCase));
		assert.strictEqual("get_data_case", toSnakeCase(testCase));
		assert.strictEqual("GET_DATA_CASE", toScreamingSnakeCase(testCase));
		assert.strictEqual("get-data-case", toKebabCase(testCase));
		assert.strictEqual("Get-Data-Case", toTrainCase(testCase));
	});

	test('python test', () => {
		const testCase = ["get", "data", "case"];

		assert.strictEqual("GET_DATA_CASE", formatConstantNameByLanguage("python", testCase));
		assert.strictEqual("get_data_case", formatVariableNameByLanguage("python", testCase));
		assert.strictEqual("GetDataCase", formatClassNameByLanguage("python", testCase));
		assert.strictEqual("get_data_case", formatFunctionNameByLanguage("python", testCase));
	});

	test('js test', () => {
		const testCase = ["get", "data", "case"];

		assert.strictEqual("GET_DATA_CASE", formatConstantNameByLanguage("javascript", testCase));
		assert.strictEqual("getDataCase", formatVariableNameByLanguage("javascript", testCase));
		assert.strictEqual("GetDataCase", formatClassNameByLanguage("javascript", testCase));
		assert.strictEqual("getDataCase", formatFunctionNameByLanguage("javascript", testCase));
	});

	test('Normal name to word', () => {
		assert.deepStrictEqual(["get", "data", "case"] , divineWords("getDataCase"));
		assert.deepStrictEqual(["get", "http", "request"] , divineWords("getHTTPRequest", new Set(["HTTP"])));
		assert.deepStrictEqual(["get", "http", "request"] , divineWords("getHTTPrequest", new Set(["HTTP"])));
	});

	test('Python name to word', () => {
		assert.deepStrictEqual(["init"], divineWords("__init__"));
		assert.deepStrictEqual(["get", "reso", "simul"], divineWords("get_RESO_simul"));
		assert.deepStrictEqual(["get", "mini", "pop"], divineWords("Get_MINIPop"));
	});
});
