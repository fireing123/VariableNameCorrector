import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { divineWords, toCamelCase, toKebabCase, toPascalCase, toScreamingSnakeCase, toSnakeCase, toTrainCase, wordCapitalize } from '../variableCorrector';
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

	test('Normal name to word', () => {
		assert.deepStrictEqual(["get", "data", "case"] , divineWords("getDataCase"));
		assert.deepStrictEqual(["get", "http", "request"] , divineWords("getHTTPRequest"));
		assert.deepStrictEqual(["get", "http", "request"] , divineWords("getHTTPrequest"));
	});

	test('Python name to word', () => {
		assert.deepStrictEqual(["init"], divineWords("__init__"));
		assert.deepStrictEqual(["get", "reso", "simul"], divineWords("get_RESO_simul"));
		assert.deepStrictEqual(["get", "mini", "pop"], divineWords("Get_MINIPop"));
	});
});
