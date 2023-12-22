#!/usr/bin/env node
import Tool from './ToolImagemin.js'
import { getArgsFromCLI } from '@toolx/core/utils.server.js'

const { options, pathIn, pathOut } = getArgsFromCLI();
const tool = new Tool(options, pathIn, pathOut);

tool.run();
