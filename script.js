function calculateBMI() {
    let l = document.getElementById('height').value / 100
    let m = document.getElementById('weight').value
    let bmi = (m / (l * l)).toFixed(1)
    bmi = parseFloat(bmi);
    if (l > 0 && m > 0) {
        document.getElementById('bmi').value = bmi;
    }
}

function clearHeightAndWeight() {
    document.getElementById('height').value = ''
    document.getElementById('weight').value = ''
}

function getReproductiveHistory() {
    if (document.getElementById('nulliparous').checked) {
        return -0.25753237109
        //return 'nulliparous'
    }
    if (document.getElementById('parous').checked) {
        return 0
        //return 'parous'
    }
    if (document.getElementById('cesarean').checked) {
        return 0.17790428473
        //return 'cesarean'
    }
}

function getUterusWeight(op_method) {
    if (document.getElementById('leq300').checked) {
        switch (op_method) {
            case 'Laparoscopy':
                return 0.639;
            case 'Robot':
                return 0;
            case 'Vaginal':
                return 0.63587863907;
            default:
                return 0;
        }
    }
    if (document.getElementById('from301to500').checked) {
        switch (op_method) {
            case 'Laparoscopy':
                return 1.31038680806;
            case 'Robot':
                return 0.19661758574;
            case 'Vaginal':
                return 1.53212454421;
            default:
                return 1.31038680806;
        }
    }
    if (document.getElementById('from501to1000').checked) {
        switch (op_method) {
            case 'Laparoscopy':
                return 1.66434402345;
            case 'Robot':
                return 0.56874314872;
            case 'Vaginal':
                return 2.38879307711;
            default:
                return 1.66434402345;
        }
    }
    if (document.getElementById('g1000').checked) {
        switch (op_method) {
            case 'Laparoscopy':
                return 2.43707001539;
            case 'Robot':
                return 1.66551704210;
            case 'Vaginal':
                return 3.22308415145;
            default:
                return 2.43707001539;
        }
    }
}

function getIndication() {
    if (document.getElementById('pain').checked) {
        return 0
    }
    if (document.getElementById('prolapse').checked) {
        return -0.37863568523
    }
    if (document.getElementById('endometriosis').checked) {
        return 0.59144240428
    }
    if (document.getElementById('bleeding').checked) {
        return -0.22184901812
    }
    if (document.getElementById('dysplasia').checked) {
        return -0.56682841277
    }
    if (document.getElementById('other').checked) {
        return -0.23529538177
    }
}

function showResult() {
    let age = document.getElementById('age').value;
    let g_age = -0.01837843073*age
    let bmi = document.getElementById('bmi').value;
    let g_bmi = 0.02142440088*bmi
    let g_hist = getReproductiveHistory();
    let g_uw_lap = getUterusWeight('Laparoscopy');
    let g_uw_robot = getUterusWeight('Robot');
    let g_uw_vag = getUterusWeight('Vaginal');
    let g_indication = getIndication();
    let beta0 = -0.28588178205;
    let g_lap = beta0 + g_age + g_bmi + g_hist + g_indication + g_uw_lap;
    let g_robot = beta0 + g_age + g_bmi + g_hist + g_indication + g_uw_robot;
    let g_vag = beta0 + g_age + g_bmi + g_hist + g_indication + g_uw_vag;

    let risk_lap = Math.exp(g_lap)/(1+Math.exp(g_lap))
    let risk_robot = Math.exp(g_robot)/(1+Math.exp(g_robot))
    let risk_vag = Math.exp(g_vag)/(1+Math.exp(g_vag))

    let message;
    message = `Laparoscopy: ${(100 * risk_lap).toFixed(1)} %
    Robot: ${(100 * risk_robot).toFixed(1)} %
    Vaginal: ${(100 * risk_vag).toFixed(1)} %`;
    //console.log("HEJ");
    document.getElementById('result').innerText = message;
    //document.getElementById('result').innerHTML = age
}
function clearInput() {
    document.getElementById('age').value = '';
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('bmi').value = ''
    document.getElementById('parous').checked = true;
    document.getElementById('leq300').checked = true;
    document.getElementById('pain').checked = true;
    let message;
    message = `Laparoscopy:\n    Robot:\n    Vaginal:`;
    document.getElementById('result').innerText = message;
}