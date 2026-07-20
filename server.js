const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Path database leads
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Helper to read leads
const readLeads = () => {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Gagal membaca database leads:', error);
    return [];
  }
};

// Helper to write leads
const writeLead = (newLead) => {
  try {
    const leads = readLeads();
    leads.push(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
    saveLeadsToCSV(); // Sinkronisasikan ke CSV otomatis
    return true;
  } catch (error) {
    console.error('Gagal menyimpan lead:', error);
    return false;
  }
};

// Path database CSV leads
const CSV_FILE = path.join(__dirname, 'leads.csv');

// Helper to escape CSV cell values
const escapeCSV = (val) => {
  if (val === undefined || val === null) return '';
  let str = String(val);
  str = str.replace(/"/g, '""');
  if (str.includes(',') || str.includes('\n') || str.includes('"') || str.includes(';')) {
    str = `"${str}"`;
  }
  return str;
};

// Helper to synchronize JSON database to CSV file
const saveLeadsToCSV = () => {
  try {
    const leads = readLeads();
    const headers = [
      'ID', 'Nama Lengkap', 'Email', 'Nama Perusahaan', 'Jabatan', 'Divisi', 'WhatsApp', 
      'Skor Total (%)', 'Status Kesiapan', 'Governance (%)', 'Strategy (%)', 
      'Data Readiness (%)', 'Assurance (%)', 'Roadmap (%)', 'Tantangan Utama', 
      'Dukungan Terpilih', 'Timeline Mulai', 'Keterlibatan Program', 'Ketertarikan Diskusi', 
      'Catatan Khusus', 'Tanggal Submit'
    ];
    
    const lines = [headers.join(',')];
    
    leads.forEach((lead) => {
      // Penanganan fallback jika ada entri data lama di leads.json
      const gov = lead.dimensionScores ? lead.dimensionScores.governance : (lead.categoryScores ? lead.categoryScores.governance : 0);
      const strat = lead.dimensionScores ? lead.dimensionScores.strategy : (lead.categoryScores ? lead.categoryScores.strategy : 0);
      const dataRead = lead.dimensionScores ? lead.dimensionScores.dataReadiness : 0;
      const ass = lead.dimensionScores ? lead.dimensionScores.assurance : 0;
      const road = lead.dimensionScores ? lead.dimensionScores.roadmap : 0;
      
      const row = [
        lead.id || '',
        lead.name || '',
        lead.email || '',
        lead.company || '',
        lead.jobTitle || '',
        lead.division || lead.jobTitle || '',
        lead.phone || '',
        `${lead.totalPercentage || 0}%`,
        lead.readinessLevel || '',
        `${gov}%`,
        `${strat}%`,
        `${dataRead}%`,
        `${ass}%`,
        `${road}%`,
        (lead.challenges || []).join('; '),
        lead.neededSupport || '',
        lead.timeline || '',
        lead.involvement || '',
        lead.interest || '',
        lead.specialNote || '',
        lead.submittedAt || ''
      ];
      lines.push(row.map(escapeCSV).join(','));
    });
    
    fs.writeFileSync(CSV_FILE, lines.join('\n') + '\n', 'utf8');
    console.log('Database leads.csv berhasil disinkronisasi.');
    return true;
  } catch (error) {
    console.error('Gagal menulis database CSV leads:', error);
    return false;
  }
};

// Sinkronisasi file CSV saat server pertama kali diaktifkan
saveLeadsToCSV();

// Definisi Kategori/Dimensi untuk 10 Pertanyaan
const DIMENSIONS = {
  governance: ['q1', 'q2'],
  strategy: ['q3', 'q7'],
  dataReadiness: ['q4', 'q5'],
  assurance: ['q6', 'q9'],
  roadmap: ['q8', 'q10']
};

const DIMENSION_NAMES = {
  governance: '1. Leadership & Governance',
  strategy: '2. Risk & Strategic Integration',
  dataReadiness: '3. Data Readiness',
  assurance: '4. Internal Control & Assurance',
  roadmap: '5. People & Implementation Roadmap'
};

// API Endpoint Submit Form
app.post('/api/submit', async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      jobTitle,
      division,
      phone,
      answers,
      challenges,
      neededSupport,
      timeline,
      involvement,
      interest,
      specialNote,
      dataConsent,
      commsConsent
    } = req.body;

    // Validasi input wajib
    if (!name || !email || !company || !jobTitle || !division || !answers || !challenges || !neededSupport || !timeline || !involvement || !interest || !dataConsent) {
      return res.status(400).json({ error: 'Mohon lengkapi seluruh data wajib kuesioner.' });
    }

    // Kalkulasi Skor
    const dimensionScores = {
      governance: 0,
      strategy: 0,
      dataReadiness: 0,
      assurance: 0,
      roadmap: 0
    };

    let totalScore = 0;
    const maxScorePerDimension = 8; // 2 pertanyaan * 4 poin
    const maxTotalScore = 40; // 10 pertanyaan * 4 poin

    // Loop through answers
    Object.keys(answers).forEach((qKey) => {
      const val = parseInt(answers[qKey] || 1, 10); // Nilai jawaban: 1, 2, 3, atau 4
      
      // Temukan dimensi
      Object.keys(DIMENSIONS).forEach((dim) => {
        if (DIMENSIONS[dim].includes(qKey)) {
          dimensionScores[dim] += val;
        }
      });
      totalScore += val;
    });

    // Hitung persentase per dimensi dan total
    const dimensionPercentages = {};
    Object.keys(dimensionScores).forEach((dim) => {
      dimensionPercentages[dim] = Math.round((dimensionScores[dim] / maxScorePerDimension) * 100);
    });

    const totalPercentage = Math.round((totalScore / maxTotalScore) * 100);

    // Kategori Kesiapan
    let readinessLevel = '';
    let readinessDesc = '';
    let readinessColor = '';

    if (totalPercentage <= 40) {
      readinessLevel = 'Belum Siap (Not Ready)';
      readinessDesc = 'Organisasi Anda masih berada di tahap awal pemahaman keberlanjutan. Diperlukan inisiasi komitmen kepemimpinan dan penyusunan struktur tata kelola awal (Leadership & Governance) untuk memulai perjalanan PSPK.';
      readinessColor = '#e53e3e'; // Merah
    } else if (totalPercentage <= 75) {
      readinessLevel = 'Sedang Berkembang (Developing)';
      readinessDesc = 'Organisasi Anda telah memulai pembahasan dasar, namun ketersediaan data (Data Readiness) dan integrasi risiko strategis masih terbatas. Fokus saat ini adalah menyusun kebijakan formal dan memetakan gap data.';
      readinessColor = '#dd6b20'; // Oranye
    } else {
      readinessLevel = 'Sangat Siap (Ready)';
      readinessDesc = 'Organisasi Anda memiliki kesiapan tata kelola dan integrasi strategis yang matang. Langkah berikutnya adalah pemantapan mekanisme penjaminan (Assurance), audit internal, serta eksekusi roadmap secara konsisten.';
      readinessColor = '#0f766e'; // Teal / Green
    }

    const leadData = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      name,
      email,
      company,
      jobTitle,
      division,
      phone: phone || '-',
      totalScore,
      totalPercentage,
      readinessLevel,
      dimensionScores: dimensionPercentages,
      challenges,
      neededSupport,
      timeline,
      involvement,
      interest,
      specialNote: specialNote || '-',
      dataConsent,
      commsConsent: commsConsent || false,
      submittedAt: new Date().toISOString()
    };

    // Simpan Lead
    writeLead(leadData);

    // Kirim data ke Google Sheets via Webhook (jika dikonfigurasi di .env)
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      if (typeof fetch === 'function') {
        fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        }).catch(err => console.error('Gagal mengirim ke Google Sheets Webhook:', err.message));
      } else {
        try {
          const url = new URL(process.env.GOOGLE_SHEET_WEBHOOK_URL);
          const data = JSON.stringify(leadData);
          const reqOpts = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(data)
            }
          };
          const httpsReq = require('https').request(reqOpts);
          httpsReq.on('error', err => console.error('Gagal mengirim ke Google Sheets (HTTPS):', err.message));
          httpsReq.write(data);
          httpsReq.end();
        } catch (err) {
          console.error('Error in Google Sheets HTTPS webhook:', err.message);
        }
      }
    }

    // WhatsApp CTA Config
    const waNumber = process.env.WHATSAPP_NUMBER || '6281234567890';
    const waText = `Halo FS Institute, saya ingin berkonsultasi mengenai hasil PSPK Organizational Readiness Assessment perusahaan kami (${company}).\n\nDetail Hasil:\n- Nama: ${name}\n- Jabatan/Divisi: ${jobTitle} / ${division}\n- Kesiapan Total: ${totalPercentage}% (${readinessLevel})\n\nRincian Dimensi:\n1. Leadership & Governance: ${dimensionPercentages.governance}%\n2. Risk & Strategic Integration: ${dimensionPercentages.strategy}%\n3. Data Readiness: ${dimensionPercentages.dataReadiness}%\n4. Internal Control & Assurance: ${dimensionPercentages.assurance}%\n5. People & Roadmap: ${dimensionPercentages.roadmap}%\n\nDukungan Utama yang Kami Butuhkan: ${neededSupport}\nRencana Mulai: ${timeline}\n\nMohon informasi jadwal diskusi evaluasi gratis dengan tim ahli FS Institute. Terima kasih!`;
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

    // Mengirim Email Laporan
    let emailSent = false;
    let emailError = null;

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || 2525, 10),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Render tantangan dalam list HTML
      const challengesListHTML = challenges.map(c => `<li>${c}</li>`).join('');

      // Template Email HTML Bermerek FS Institute
      const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0f766e 0%, #115e59 100%); color: #ffffff; padding: 35px 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; line-height: 1.3; }
          .header p { margin: 8px 0 0 0; font-size: 13px; opacity: 0.9; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; }
          .content { padding: 32px 24px; }
          .welcome { font-size: 15px; line-height: 1.6; margin-bottom: 24px; color: #334155; }
          .score-box { background-color: #f0fdfa; border: 2px dashed #0d9488; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 28px; }
          .score-circle { display: inline-block; width: 100px; height: 100px; line-height: 100px; border-radius: 50%; background-color: #0f766e; color: #ffffff; font-size: 32px; font-weight: 800; margin-bottom: 12px; }
          .level-badge { display: inline-block; padding: 6px 18px; border-radius: 9999px; background-color: ${readinessColor}; color: #ffffff; font-weight: 700; font-size: 13px; text-transform: uppercase; margin-top: 5px; }
          .desc { font-size: 13.5px; color: #475569; line-height: 1.5; margin-top: 15px; font-style: italic; }
          .section-title { font-size: 16px; font-weight: 700; margin: 28px 0 12px 0; color: #0f766e; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          th { background-color: #f8fafc; color: #475569; text-align: left; padding: 12px 10px; font-size: 13px; border-bottom: 1px solid #e2e8f0; font-weight: 600; }
          td { padding: 14px 10px; font-size: 13.5px; border-bottom: 1px solid #f1f5f9; color: #334155; }
          .progress-bar-bg { width: 100px; height: 6px; background-color: #e2e8f0; border-radius: 3px; overflow: hidden; display: inline-block; vertical-align: middle; margin-right: 8px; }
          .progress-bar-fill { height: 100%; background-color: #0f766e; }
          .info-list { list-style: none; padding: 0; margin: 0; }
          .info-list li { padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; }
          .info-list strong { color: #0f766e; }
          .challenges-box { background-color: #f8fafc; border-radius: 8px; padding: 16px 20px; border-left: 4px solid #94a3b8; margin-bottom: 24px; }
          .challenges-box ul { padding-left: 20px; margin: 8px 0 0 0; font-size: 13.5px; line-height: 1.5; color: #475569; }
          .cta-section { text-align: center; margin: 36px 0 16px 0; }
          .btn-cta { display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 14px 30px; font-size: 15px; font-weight: 700; border-radius: 6px; box-shadow: 0 4px 6px rgba(22, 163, 74, 0.15); transition: background-color 0.2s; }
          .footer { background-color: #f8fafc; padding: 24px; text-align: center; font-size: 11.5px; color: #94a3b8; border-top: 1px solid #e2e8f0; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PSPK Organizational Readiness Report</h1>
            <p>FS Institute Assessment Center</p>
          </div>
          <div class="content">
            <div class="welcome">
              Kepada Yth. Bapak/Ibu <strong>${name}</strong>,<br><br>
              Terima kasih telah mengisi <strong>PSPK Organizational Readiness Assessment</strong> yang diselenggarakan oleh FS Institute. Berikut adalah laporan analisis awal tingkat kesiapan organisasi Anda (<strong>${company}</strong>) terhadap kewajiban pengungkapan keberlanjutan PSPK 1 dan PSPK 2:
            </div>
            
            <div class="score-box">
              <div class="score-circle">${totalPercentage}%</div>
              <div style="font-size: 13px; color: #475569; font-weight: 600;">Status Kesiapan Organisasi:</div>
              <div class="level-badge">${readinessLevel}</div>
              <div class="desc">"${readinessDesc}"</div>
            </div>

            <div class="section-title">Rincian per Dimensi Kesiapan</div>
            <table>
              <thead>
                <tr>
                  <th>Dimensi Kesiapan PSPK</th>
                  <th style="text-align: right; width: 150px;">Skor Kesiapan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Leadership & Governance</td>
                  <td style="text-align: right; font-weight: 700; white-space: nowrap;">
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${dimensionPercentages.governance}%;"></div></div>
                    ${dimensionPercentages.governance}%
                  </td>
                </tr>
                <tr>
                  <td>2. Risk & Strategic Integration</td>
                  <td style="text-align: right; font-weight: 700; white-space: nowrap;">
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${dimensionPercentages.strategy}%;"></div></div>
                    ${dimensionPercentages.strategy}%
                  </td>
                </tr>
                <tr>
                  <td>3. Data Readiness</td>
                  <td style="text-align: right; font-weight: 700; white-space: nowrap;">
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${dimensionPercentages.dataReadiness}%;"></div></div>
                    ${dimensionPercentages.dataReadiness}%
                  </td>
                </tr>
                <tr>
                  <td>4. Internal Control & Assurance</td>
                  <td style="text-align: right; font-weight: 700; white-space: nowrap;">
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${dimensionPercentages.assurance}%;"></div></div>
                    ${dimensionPercentages.assurance}%
                  </td>
                </tr>
                <tr>
                  <td>5. People & Implementation Roadmap</td>
                  <td style="text-align: right; font-weight: 700; white-space: nowrap;">
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${dimensionPercentages.roadmap}%;"></div></div>
                    ${dimensionPercentages.roadmap}%
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="section-title">Kebutuhan & Rencana Organisasi</div>
            <div class="challenges-box">
              <strong>Tantangan Utama:</strong>
              <ul>
                ${challengesListHTML}
              </ul>
            </div>
            
            <ul class="info-list">
              <li><strong>Dukungan Terpilih:</strong> ${neededSupport}</li>
              <li><strong>Rencana Mulai:</strong> ${timeline}</li>
              <li><strong>Ketertarikan Diskusi:</strong> ${interest}</li>
            </ul>

            <div class="welcome" style="margin-top: 24px; margin-bottom: 0;">
              <strong>Rekomendasi Langkah Awal:</strong><br>
              Penerapan PSPK memerlukan pendekatan komprehensif dari aspek tata kelola hingga kesiapan data operasional. Untuk mendiskusikan *gap analysis* lebih dalam serta langkah menyusun roadmap implementasi yang taktis, silakan jadwalkan diskusi evaluasi gratis dengan tim ahli FS Institute.
            </div>

            <div class="cta-section">
              <a href="${waLink}" class="btn-cta" target="_blank">Diskusi Lanjutan via WhatsApp</a>
            </div>
          </div>
          <div class="footer">
            &copy; 2026 FS Institute. All rights reserved.<br>
            Laporan indikatif ini disusun secara otomatis berdasarkan jawaban evaluasi mandiri responden.
          </div>
        </div>
      </body>
      </html>
      `;

      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || 'FS Institute Center'}" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: `[Laporan Kesiapan] PSPK Organizational Readiness Assessment - ${company}`,
        html: htmlEmail,
      });

      emailSent = true;
    } catch (err) {
      console.error('Gagal mengirim email:', err);
      emailError = err.message;
    }

    return res.status(200).json({
      success: true,
      name,
      company,
      totalPercentage,
      readinessLevel,
      readinessDesc,
      readinessColor,
      dimensionScores: dimensionPercentages,
      waLink,
      emailSent,
      emailWarning: emailSent ? null : `Skor berhasil disimpan dan dihitung, tetapi pengiriman email gagal (${emailError}). Silakan periksa konfigurasi SMTP server Anda.`
    });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server saat memproses data kuesioner Anda.' });
  }
});

// Jalankan Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server PSPK Readiness Assessment berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
