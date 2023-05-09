import javax.swing.*;

import java.awt.*;

import java.awt.event.ActionEvent;

import java.awt.event.ActionListener;

public class Calculator extends JFrame implements ActionListener {

    private JTextField display;

    public Calculator() {

        setTitle("계산기");

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        display = new JTextField(20);

        display.setEditable(false);

        JPanel panel = new JPanel();

        panel.setLayout(new GridLayout(4, 4));

        String[] buttons = {

            "7", "8", "9", "/",

            "4", "5", "6", "*",

            "1", "2", "3", "-",

            "0", ".", "=", "+"

        };

        for (String button : buttons) {

            JButton btn = new JButton(button);

            btn.addActionListener(this);

            panel.add(btn);

        }

        add(display, BorderLayout.NORTH);

        add(panel, BorderLayout.CENTER);

        pack();

        setVisible(true);

    }

    public static void main(String[] args) {

        new Calculator();

    }

    @Override

    public void actionPerformed(ActionEvent e) {

        String command = e.getActionCommand();

        if (command.equals("=")) {

            try {

                String expression = display.getText();

                double result = evaluateExpression(expression);

                display.setText(String.valueOf(result));

            } catch (Exception ex) {

                display.setText("Error");

            }

        } else {

            display.setText(display.getText() + command);

        }

    }

    private double evaluateExpression(String expression) {

        return (double) new Object() {

            int pos = -1, ch;

            void nextChar() {

                ch = (++pos < expression.length()) ? expression.charAt(pos) : -1;

            }

            boolean eat(int charToEat) {

                while (ch == ' ') nextChar();

                if (ch == charToEat) {

                    nextChar();

                    return true;

                }

                return false;

            }

            double parse() {

                nextChar();

                double x = parseExpression();

                if (pos < expression.length()) throw new RuntimeException("Unexpected: " + (char) ch);

                return x;

            }

            double parseExpression() {

                double x = parseTerm();

                for (;;) {

                    if (eat('+')) x += parseTerm(); // 덧셈

                    else if (eat('-')) x -= parseTerm(); // 뺄셈

                    else return x;

                }

            }

            double parseTerm() {

                double x = parseFactor();

                for (;;) {

                    if (eat('*')) x *= parseFactor(); // 곱셈

                    else if (eat('/')) x /= parseFactor(); // 나눗셈

                    else return x;

                }

            }

            double parseFactor() {

                if (eat('+')) return parseFactor(); // 단항 양수

                if (eat('-')) return -parseFactor(); // 단항 음수

                double x;

                int startPos = this.pos;

                if (eat('(')) { // 괄호

                    x = parseExpression();

                    eat(')');

                } else if ((ch >= '0' && ch <= '9') || ch == '.') { // 숫자

                    while ((ch >= '0' && ch <= '9') || ch == '.') nextChar();

                    x = Double.parseDouble(expression.substring(startPos, this.pos));

                } else {

                    throw new RuntimeException("Unexpected: " + (char) ch);

                }

                if (eat('^')) x = Math.pow(x, parseFactor()); // 지수

                return x;

            }

       

