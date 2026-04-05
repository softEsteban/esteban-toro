import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

import type {
  Block,
  CoverData,
  TextData,
  CodeData,
  CalloutData,
  ChecklistData,
  TableData,
  CTAData,
} from "@/types/pdf";

// type Block = CoverBlock | TextBlock | CodeBlock | CalloutBlock;

// interface CoverBlock {
//     id: string;
//     type: "cover";
//     data: CoverData;
// }

// interface TextBlock {
//     id: string;
//     type: "text";
//     data: TextData;
// }

// interface CodeBlock {
//     id: string;
//     type: "code";
//     data: CodeData;
// }

// interface CalloutBlock {
//     id: string;
//     type: "callout";
//     data: CalloutData;
// }

// interface CoverData {
//     title: string;
//     subtitle: string;
//     author: string;
// }

// interface TextData {
//     heading?: string;
//     body: string;
// }

// interface CodeData {
//     code: string;
// }

// interface CalloutData {
//     title: string;
//     body: string;
// }


const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: "Helvetica",
    },
    heading: {
        fontSize: 18,
        marginBottom: 8,
    },
    text: {
        marginBottom: 12,
        lineHeight: 1.6,
    },
    code: {
        fontFamily: "Courier",
        fontSize: 10,
        backgroundColor: "#f3f4f6",
        padding: 10,
        marginBottom: 12,
    },
    callout: {
        borderLeftWidth: 3,
        borderLeftColor: "#6366f1",
        paddingLeft: 10,
        marginBottom: 12,
    },
    coverTitle: {
        fontSize: 24,
        marginBottom: 12,
    },
    coverSubtitle: {
        fontSize: 14,
        marginBottom: 20,
    },
});

export function PDFDocument({ blocks }: { blocks: Block[] }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {blocks.map((block) => {
                    switch (block.type) {
                        case "cover": {
                            const data = block.data as CoverData;
                            return (
                                <View key={block.id}>
                                    <Text style={styles.coverTitle}>{data.title}</Text>
                                    <Text style={styles.coverSubtitle}>
                                        {data.subtitle}
                                    </Text>
                                    <Text>{data.author}</Text>
                                </View>
                            );
                        }

                        case "text": {
                            const data = block.data as TextData;
                            return (
                                <View key={block.id}>
                                    {data.heading && (
                                        <Text style={styles.heading}>
                                            {data.heading}
                                        </Text>
                                    )}
                                    <Text style={styles.text}>{data.body}</Text>
                                </View>
                            );
                        }

                        case "code": {
                            const data = block.data as CodeData;
                            return (
                                <View key={block.id}>
                                    <Text style={styles.code}>{data.code}</Text>
                                </View>
                            );
                        }

                        case "callout": {
                            const data = block.data as CalloutData;
                            return (
                                <View key={block.id} style={styles.callout}>
                                    <Text>{data.title}</Text>
                                    <Text>{data.body}</Text>
                                </View>
                            );
                        }

                        default:
                            return null;
                    }
                })}
            </Page>
        </Document>
    );
}