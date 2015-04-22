
var data = {
	patients: [
		{
			id: 1,
			read: false,
			first_name: 'Stella',
			last_name: 'Perrot',
			notes: '',
			requested_feedback: [],
			feedback: [],
			star: false,
			seen: false,
			worklist: true,
			physician: 'Juan Garza',
			reports: [
				{
					id: 11235281,
					type: 'rad',
					date: '1/3/2015',
					image_id: 'R1',
					exam_type: 'Ultrasound',
					LBIRAD: 3,
					RBIRAD: 2,
					findings: '',
					recommend: 'Breast MRI recommended',
					radiologist_id: 1
				},
				{
					id: 11235398,
					type: 'rad',
					date: '1/5/2015',
					image_id: 'R1',
					exam_type: 'Mammogram',
					LBIRAD: 4,
					RBIRAD: 2,
					findings: '',
					recommend: 'Biopsy recommended',
					radiologist_id: 1
				}
			]
		},
		{
			id: 2,
			read: false,
			first_name: 'Kayla',
			last_name: 'Patel',
			notes: '',
			requested_feedback: {
				date: new Date(),
				is_fulfilled: false,
				type: {
					pathology: true
				}
			},
			feedback: [],
			star: false,
			seen: false,
			worklist: false,
			physician: 'Megan Robinson',
			reports: [
				{
					id: 31263633,
					type: 'rad',
					date: '02/05/2013',
					image_id: 'R2',
					exam_type: 'Mammogram',
					LBIRAD: 3,
					RBIRAD: 2,
					findings: 'fibroglandural density | indistinct area in the left breast | upper inner quadrant with scattered amorphous microcalcifications',
					recommend: '',
					radiologist_id: 1
				},
				{
					id: 32590283,
					type: 'rad',
					date: '02/20/2013',
					image_id: 'R3',
					exam_type: 'Ultrasound',
					LBIRAD: 4,
					RBIRAD: 2,
					findings: 'Biopsy recommended',
					recommend: 'Biopsy recommended',
					radiologist_id: 4
				},
				// {
				// 	id: 33489323,
				// 	type: 'path',
				// 	date: '2/22/2013',
				// 	diagnosis: 'Invasive Ductal Carcinoma',
				// 	fd_cui: 'C1134719',
				// 	location: 'Left Breast',
				// 	procedure: 'Lumpectomy',
				// 	findings: 'FOCAL PAPILLARY FEATURES | 2.4 cm | NOTTINGHAM SCORE 7/9 | NUCLEAR GRADE 3| EXTENSIVE DCIS | CENTRAL COMEDO TYPE NECROSIS | MICROCALCIFICATIONS',
				// 	classification: '',
				// 	pathologist_id: 2
				// }
			]
		},
		{
			id: 3,
			read: false,
			first_name: 'Lexi',
			last_name: 'Williams',
			notes: '',
			requested_feedback: [],
			feedback: [],
			star: false,
			seen: false,
			worklist: true,
			physician: 'Gerald Mitchell',
			reports: [
				{
					id: 41392054,
					type: 'rad',
					date: '11/1/2014',
					image_id: 'R4',
					exam_type: 'Mammogram',
					LBIRAD: 4,
					RBIRAD: 2,
					findings: 'scattered areas of fibroglandular density | new 5 mm nodule in upper outer quadrant of the left breast | right breast is normal',
					recommend: 'Biopsy recommended',
					radiologist_id: 2
				},
				{
					id: 42690324,
					type: 'path',
					date: '11/2/2014',
					diagnosis: 'Invasive Ductal Carcinoma',
					fd_cui: 'C1134719',
					location: 'Left Breast',
					procedure: 'Biopsy',
					findings: 'NUCLEAR GRADE 3',
					classification: 'Malignant',
					pathologist_id: 3
				}
			]
		},
		{
			id: 4,
			read: false,
			first_name: 'Lydia',
			last_name: 'Clark',
			notes: '',
			requested_feedback: [],
			feedback: [],
			star: false,
			seen: false,
			worklist: true,
			physician: 'Kelly Jenkins',
			reports: [
				{
					id: 51684935,
					type: 'rad',
					date: '6/13/2012',
					image_id: 'R5',
					exam_type: 'Mammogram',
					LBIRAD: 2,
					RBIRAD: 4,
					findings: 'Fibroglandular densities scattered throughout both breast | indistinct area in the right breast which is suspicious',
					recommend: 'Biopsy recommended',
					radiologist_id: 2
				},
				{
					id: 52589285,
					type: 'path',
					date: '6/15/2012',
					diagnosis: 'Fibrocystic change with duct ectasia and marked ductal epithelial hyperplasia associated with microcalcifications',
					fd_cui: 'C0016034 | C0152442 | C0741698',
					location: 'Right Breast',
					procedure: 'Biopsy',
					findings: ' FIBROCYSTIC CHANGE | DUCT ECTASIA | MARKED DUCTAL EPITHELIAL HYPERPLASIA | MICROCALCIFICATIONS',
					classification: 'Benign',
					pathologist_id: 4
				}
			]
		},
		{
			id: 5,
			read: false,
			first_name: 'Emily',
			last_name: 'Ortez',
			notes: '',
			requested_feedback: [],
			feedback: [],
			star: false,
			seen: false,
			worklist: true,
			physician: 'Virginia Rose',
			reports: [
				{
					id: 61439066,
					type: 'rad',
					date: '4/10/2013',
					image_id: 'R6',
					exam_type: 'Mammogram',
					LBIRAD: 2,
					RBIRAD: 4,
					findings: '4 mm Nodule in left breast | nodule has an irregular border and is indistinct',
					recommend: '',
					radiologist_id: 3
				},
				{
					id: 52589285,
					type: 'path',
					date: '4/13/2013',
					diagnosis: 'Intraductal papiloma with some atypical features',
					fd_cui: 'C1269834',
					location: 'Left Breast',
					procedure: 'Excision',
					findings: ' ',
					classification: 'Pre-Malignant',
					pathologist_id: 4
				}
			]
		}
	],
	radiologists: [
		{
			id: 1,
			first_name: 'Haley',
			last_name: 'Anderson'
		},
		{
			id: 2,
			first_name: 'David',
			last_name: 'Simard'
		},
		{
			id: 3,
			first_name: 'Mariana',
			last_name: 'Castro'
		},
		{
			id: 4,
			first_name: 'Thomas',
			last_name: 'Schmid'
		}
	],
	pathologists: [
		{
			id: 1,
			first_name: 'Melina',
			last_name: 'Weber'
		},
		{
			id: 2,
			first_name: 'Lucas',
			last_name: 'Laurent'
		},
		{
			id: 3,
			first_name: 'Sofia',
			last_name: 'Pinto'
		},
		{
			id: 4,
			first_name: 'Ben',
			last_name: 'Albrecht'
		}
	]
};
