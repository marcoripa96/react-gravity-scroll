import { useEffect, useLayoutEffect } from "react";
import { isClient } from "./utils";

export const useIsomorphicEffect = isClient ? useLayoutEffect : useEffect;
