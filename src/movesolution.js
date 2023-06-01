function makeDraggable(event) {
    let svg = event.target;
    svg.addEventListener('mousedown', startDrag, false);
    svg.addEventListener('mousemove', drag, false);
    svg.addEventListener('mouseup', endDrag, false);
    svg.addEventListener('mouseleave', endDrag);

    function getMousePosition(event) {
        let CTM = svg.getScreenCTM();
        return {
            x: (event.clientX - CTM.e) / CTM.a,
            y: (event.clientY - CTM.f) / CTM.d
        };
    }

    let selectedElement, offset, transform;

    function startDrag(event) {
        if (event.target.classList.contains('draggable')) {
            selectedElement = event.target;
            offset = getMousePosition(event);

            let transforms = selectedElement.transform.baseVal;
            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {

                let translate = svg.createSVGTransform();
                translate.setTranslate(0, 0);
                selectedElement.transform.baseVal.insertItemBefore(translate, 0);
            }

            transform = transforms.getItem(0);
            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;
        }
    }

    function drag(event) {
        if (selectedElement) {
            event.preventDefault();
            let coord = getMousePosition(event);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
        }
    }

    function endDrag(event) {
        selectedElement = false;
    }
}