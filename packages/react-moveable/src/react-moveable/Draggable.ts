import Moveable from "./Moveable";
import { invert, caculate, minus, sum, convertPositionMatrix } from "./matrix";

export function dragStart(moveable: Moveable, { datas }: any) {
    const {
        matrix,
        beforeMatrix,
        is3d,
        left,
        top,
        origin,
    } = moveable.state;

    const n = is3d ? 4 : 3;
    datas.is3d = is3d;
    datas.matrix = matrix;
    datas.inverseMatrix = invert(matrix, n);
    datas.beforeMatrix = beforeMatrix;
    datas.inverseBeforeMatrix = invert(beforeMatrix, n);
    datas.absoluteOrigin = convertPositionMatrix(sum([left, top], origin), n);
    datas.startDragBeforeDist = caculate(datas.inverseBeforeMatrix, datas.absoluteOrigin, is3d ? 4 : 3);
    datas.startDragDist = caculate(datas.inverseMatrix, datas.absoluteOrigin, is3d ? 4 : 3);
}
export function getDragDist({ datas, distX, distY }: any, isBefore?: boolean) {
    const {
        inverseBeforeMatrix,
        inverseMatrix, is3d,
        startDragBeforeDist,
        startDragDist, absoluteOrigin,
    } = datas;
    const n = is3d ? 4 : 3;

    return minus(
        caculate(
            isBefore ? inverseBeforeMatrix : inverseMatrix,
            sum(absoluteOrigin, [distX, distY]),
            n,
        ),
        isBefore ? startDragBeforeDist : startDragDist,
    );
}