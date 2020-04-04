// @ts-ignore
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const Dina4: { [id: string]: number } = {
  width: 595,
  height: 842,
};
const margin = 100;

interface IResponse {
  error: boolean;
  data: any;
  message: string;
}

interface IParamsHelper {
  user: {
    email?: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    userName?: string;
    picture?: string;
    verified?: boolean;
  };
  category?: {
    name: string;
    description: string
  };
  offer: {
    title: string;
    description: string;
  };
}

interface IParamsSeeker {
  user: {
    email?: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    userName?: string;
    picture?: string;
    verified?: boolean;
  };
  request: {
    title: string;
    description: string;
  };
  category?: {
    name: string;
    description: string
  };
}

interface IParams {
  type: string;
  user: {
    email?: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    userName?: string;
    picture?: string;
    verified?: boolean;
  };
  objective: {
    title: string;
    description: string;
  };
  category?: {
    name: string;
    description: string
  };
}

const FlyerGenerator = {
  helper_big: async (params: IParamsHelper): Promise<IResponse> => {
    const {user, category, offer} = params;

    return await buildBigPdf({user, category, objective: offer, type: 'Biete Hilfe'});
  },
  helper_small: async (params: IParamsHelper): Promise<IResponse> => {
    const {user, category, offer} = params;
    const hash = createFileName();

    try {
      const filePath = path.resolve(hash + '.pdf');

      // Create a document
      const doc = new PDFDocument({size: 'A4'});

      // fill the pdf here!

      doc.strokeColor('#CCCCCC')
        .lineWidth(1)
        .dash(5, {space: 10})
        .moveTo(margin / 2, Dina4.height / 3)
        .lineTo(Dina4.width - margin / 2, Dina4.height / 3)
        .stroke()
        .undash();

      doc.strokeColor('#CCCCCC')
        .lineWidth(1)
        .dash(5, {space: 10})
        .moveTo(margin / 2, Dina4.height / 3 * 2)
        .lineTo(Dina4.width - margin / 2, Dina4.height / 3 * 2)
        .stroke()
        .undash();

      const angle = 90;

      // erstes Feld
      let x = margin / 2;
      let y = Dina4.height - margin / 2;

      for (let i = 0; i <= 2; i++) {

        x = margin / 2;
        y = Dina4.height - margin / 2 - (i * Dina4.height / 3);

        doc.rotate(angle * (-1), {origin: [x, y]});
        doc.lineCap('butt')
          .strokeColor('#1C1C1C')
          .lineWidth(30)
          .moveTo(x, y + 15)
          .lineTo(x + Dina4.height / 3 - margin, y + 15)
          .stroke();
        doc.image('./public/ressources/images/logo_light.png', x + 10, y + 2, {height: 26});
        doc.rotate(angle, {origin: [x, y]});
      }

      const result = await buildStream(doc, filePath);
      return {error: false, data: result, message: 'success!'};
    } catch (e) {
      console.log(e);
      return {error: true, data: null, message: e};
    }
  },
  seeking_big: async (params: IParamsSeeker): Promise<IResponse> => {
    const {user, category, request} = params;

    return await buildBigPdf({user, category, objective: request, type: 'Suche Hilfe'});
  },
};

const createFileName = async (): Promise<string> => {
  const date = new Date(Date.now()).getTime();

  return await bcryptjs.hash(date.toString(), 10);
};

const buildStream = async (doc: any, filePath: string) => {
  const writeStream = fs.createWriteStream(filePath);

  doc.pipe(writeStream);

  // Finalize PDF file
  doc.end();

  const promiseFn = () => {
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        const result = fs.readFileSync(filePath, {encoding: 'binary'});

        fs.unlinkSync(filePath);

        resolve(result);
      });
    });
  };

  return await promiseFn();
};

const buildBigPdf = async (params: IParams) => {
  const {user, category, objective, type} = params;
  const hash = createFileName();

  try {
    const filePath = path.resolve(hash + '.pdf');

    // Create a document
    const doc = new PDFDocument({size: 'A4'});

    // fill the pdf here!

    // Head
    // doc.lineCap('butt')
    //     .strokeColor('#1C1C1C')
    //     .lineWidth(100)
    //     .moveTo(margin/2, margin/2+50)
    //     .lineTo(Dina4.width-margin/2,margin/2+50)
    //     .stroke();
    doc.image('./public/ressources/images/logo_dark.png', margin, margin / 2 + 10, {height: 80});

    doc.moveDown(1.5);
    doc.fillColor('#ef7d18')
      .fontSize(20)
      .text(type, {width: Dina4.width - (2 * margin), align: 'right'})
      .fillColor('black');

    // User picture (if)

    if ('picture' in user) {
      doc.image(user.picture, Dina4.width / 2 - 50, 180, {fit: [100, 100]});
    }

    doc.fontSize(12);
    doc.font('./public/ressources/fonts/Open_Sans/OpenSans-Regular.ttf')
      .text(user.firstName + ' ' + user.lastName, margin, 200, {
        width: Dina4.width - (2 * margin),
        align: 'right',
      })
      .moveDown(0.25)
      .text('Telefonnr.: ' + user.phoneNumber, {width: Dina4.width - (2 * margin), align: 'right'});

    doc.moveDown(3);

    doc.font('./public/ressources/fonts/Open_Sans/OpenSans-Bold.ttf')
      .text(objective?.title, {align: 'justify'});

    doc.moveDown(1);

    doc.font('./public/ressources/fonts/Open_Sans/OpenSans-Regular.ttf')
      .text(objective?.description);

    doc.moveDown(2);

    doc.rect(margin, 525, Dina4.width - margin * 2, 120).fillAndStroke('#fff', '#1c1c1c');
    doc.fill('#000').stroke();
    // doc.fontSize(16);
    doc
      .text('Wichtig: Selbstschutz bei Nachbarschaftshilfe', margin + 15, 535)
      .moveDown(0.3)
      .list([
        'Hust- und Niesregeln beachten',
        'Hände gründlich mit Seife waschen',
        'Abstandhalten',
        'Atemschutzmasken zum Fremdschutz',
        'Ausgetauschte Gegenstände reinigen',
      ], {bulletRadius: 2, bulletIndent: 3});

    doc.image('./public/ressources/images/Logo_Projekt_02.png', margin - 25, Dina4.height - margin - margin / 4, {
      height: 60,
      align: 'left',
    });
    doc.image('./public/ressources/images/qr_light.png', Dina4.width / 2 - 50, Dina4.height - margin - margin / 2, {
      fit: [100, 100],
      align: 'center',
    });
    doc.fontSize(16)
      .text('coronahelfer.eu', Dina4.width / 2 + 50 + 10, Dina4.height - margin - margin / 2 + 8, {
        width: Dina4.width,
        align: 'left',
      })
      .moveDown(0.1)
      .text('hilfefuercorona.de', {width: Dina4.width, align: 'left'})
      .moveDown(0.1)
      .text('helpforcorona.de', {width: Dina4.width, align: 'left'});

    const result = await buildStream(doc, filePath);
    return {error: false, data: result, message: 'success!'};
  } catch (e) {
    console.log(e);
    return {error: true, data: null, message: e};
  }
};

export default FlyerGenerator;
